export class ReportCardDto {
  className: string;
  rollNo: number;
  subjects: {
    subjectName: string;
    marks: number;
    remarks: string;
    teacherName: string;
  }[];
}
