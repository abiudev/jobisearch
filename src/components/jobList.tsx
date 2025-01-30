import type React from "react";
import { useState, useEffect } from "react";
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

const JobCard: React.FC<{ job: Job; onAddToList: (jobId: string) => void }> = ({
  job,
  onAddToList,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={job.employer_logo || "/placeholder.svg?height=64&width=64"}
          alt={`${job.employer_name} logo`}
          className="w-16 h-16 object-contain"
        />
        <div>
          <CardTitle>{job.job_title}</CardTitle>
          <p className="text-sm text-muted-foreground">{job.employer_name}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{job.job_description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {job.job_city}, {job.job_country}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">
              {job.job_salary_currency} {job.job_salary_min} -{" "}
              {job.job_salary_max}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">{job.job_employment_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span className="text-sm">
              {job.job_is_remote ? "Remote" : "On-site"}
            </span>
          </div>
        </div>
        {job.job_benefits && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {job.job_benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button className="flex-1" asChild>
          <a
            href={job.employer_website || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onAddToList(job.job_id)}
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Add to List
        </Button>
      </CardFooter>
    </Card>
  );
};

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch jobs from your API here
    const fetchJobs = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleAddToList = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.job_id} job={job} onAddToList={handleAddToList} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
