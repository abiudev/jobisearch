import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import { fetchAppliedJobs, removeAppliedJob } from "../store/slices/appliedJobsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Trash2, ExternalLink, User, Mail, Calendar, TrendingUp } from "lucide-react";
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

  const thisMonthJobs = jobs.filter(j => {
    const appliedDate = new Date(j.applied_at);
    const now = new Date();
    return appliedDate.getMonth() === now.getMonth() && appliedDate.getFullYear() === now.getFullYear();
  });

  const thisWeekJobs = jobs.filter(j => {
    const appliedDate = new Date(j.applied_at);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return appliedDate >= weekAgo;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1 border-teal-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="w-6 h-6" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm">{user?.email}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">
                    Member since {new Date(user?.createdAt || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Applications</span>
                  <span className="font-bold text-teal-600 text-lg">{jobs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-blue-600 text-lg">{thisMonthJobs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-bold text-green-600 text-lg">{thisWeekJobs.length}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                onClick={() => navigate("/")}
              >
                Browse More Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-teal-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Applied Jobs
                </CardTitle>
                <Badge variant="secondary" className="bg-white text-teal-700 font-semibold">
                  {jobs.length} Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading your applications...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg mb-2">No applications yet</p>
                  <p className="text-gray-500 text-sm mb-6">Start applying to jobs to track them here</p>
                  <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-teal-600 to-teal-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-all border-l-4 border-l-teal-500">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{job.job_title}</h3>
                            <p className="text-teal-600 font-medium mb-3">{job.company}</p>
                            
                            <div className="flex flex-wrap gap-3 mb-3">
                              {job.location && (
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 text-teal-500" />
                                  {job.location}
                                </div>
                              )}
                              {job.job_type && (
                                <Badge variant="outline" className="text-xs">
                                  {job.job_type}
                                </Badge>
                              )}
                              {job.salary && (
                                <Badge variant="secondary" className="text-xs">
                                  {job.salary}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                                {job.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Applied {new Date(job.applied_at).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 flex-shrink-0">
                            {job.job_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-teal-50 hover:border-teal-300"
                                asChild
                              >
                                <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
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
      </div>
    </div>
  );
}
