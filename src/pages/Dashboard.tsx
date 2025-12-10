import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import { fetchAppliedJobs, removeAppliedJob } from "../store/slices/appliedJobsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Trash2, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { jobs, loading } = useSelector((state: RootState) => state.appliedJobs);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    dispatch(fetchAppliedJobs());
  }, [isAuthenticated, dispatch, navigate]);

  const handleRemove = async (applicationId: string) => {
    try {
      await dispatch(removeAppliedJob(applicationId)).unwrap();
      toast.success("Job removed from your list");
    } catch (error: any) {
      toast.error(error || "Failed to remove job");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-600 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Manage your job applications and profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-teal-600">{jobs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {jobs.filter(j => j.status === 'applied').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              {jobs.filter(j => {
                const appliedDate = new Date(j.applied_at);
                const now = new Date();
                return appliedDate.getMonth() === now.getMonth();
              }).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Applied Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8">Loading...</p>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No applications yet</p>
              <Button onClick={() => navigate("/")} className="bg-teal-600">
                Browse Jobs
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.job_title}</h3>
                        <p className="text-gray-600 mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {job.location && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                          )}
                          {job.job_type && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Briefcase className="w-4 h-4" />
                              {job.job_type}
                            </div>
                          )}
                          {job.salary && (
                            <div className="text-sm text-gray-600">
                              {job.salary}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{job.status}</Badge>
                          <span className="text-sm text-gray-500">
                            Applied {new Date(job.applied_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {job.job_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemove(job.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
