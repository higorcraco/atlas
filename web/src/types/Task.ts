import { AuditInfo } from "./AuditInfo";

export type Task = {
  id?: number;
  position: number;
  title: string;
  description: string;
  completed: boolean;
  auditInfo?: AuditInfo;
};
