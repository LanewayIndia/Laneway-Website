export type JobStatus = "active" | "closed";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  tags: string[];
  postedDate: string;
  status: JobStatus;
}
