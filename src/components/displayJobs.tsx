import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, DollarSign, Globe, Bookmark } from "lucide-react";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  job_employment_type: string;
  job_city: string;
  job_country: string;
  job_description: string;
  job_salary_currency: string;
  job_salary_min: number;
  job_salary_max: number;
  job_is_remote: boolean;
  job_benefits: string[] | null;
}

const truncateDescription = (description: string, wordLimit = 55) => {
  const words = description.split(/\s+/);
  if (words.length <= wordLimit) return description;

  const truncated = words.slice(0, wordLimit).join(" ") + " ....";

  return <span>{truncated}</span>;
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <Card className="w-full max-w-md flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={job.employer_logo || "/placeholder.svg?height=64&width=64"}
          alt={`${job.employer_name} logo`}
          className="w-16 h-16 object-contain"
        />
        <div>
          <CardTitle className="text-lg">{job.job_title}</CardTitle>
          <p className="text-sm text-muted-foreground">{job.employer_name}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm mb-4">
          {truncateDescription(job.job_description)}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-6 h-6 text-teal-600" />
            <span className="text-xs">
              {job.job_city}, {job.job_country}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-teal-600" />
            <span className="text-xs">
              {job.job_salary_currency} {job.job_salary_min} -{" "}
              {job.job_salary_max}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-5 h-5 text-teal-600" />
            <span className="text-xs">{job.job_employment_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-5 h-5 text-teal-600" />
            <span className="text-xs">
              {job.job_is_remote ? "Remote" : "On-site"}
            </span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
          {job.job_benefits && job.job_benefits.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {job.job_benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {job.job_benefits.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.job_benefits.length - 3} more
                </Badge>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No benefits provided</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button className="flex-1 bg-teal-600 text-sm" asChild>
          <a
            href={job.employer_website || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </Button>
        <Button variant="outline" className="flex-1 text-sm">
          <Bookmark className="w-4 h-4 mr-2" />
          Add to List
        </Button>
      </CardFooter>
    </Card>
  );
};

const JobList: React.FC = () => {
  const { jobs, status, error } = useSelector((state: RootState) => state.jobs);

  const searchTerm = useSelector((state: RootState) => state.jobs.searchTerm);

  if (status === "loading")
    return <div className="text-center py-8">Loading...</div>;
  if (status === "failed")
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!jobs.length)
    return <div className="text-center py-8">No jobs found.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Job Listings for <span>{searchTerm}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: Job) => (
          <JobCard key={job.job_id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
