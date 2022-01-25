import PLOType from './plo.type';
import CourseType from './course.type';

type TranscriptType = {
  plos: (PLOType & {number: number})[];
  courses: CourseType[];
  achieved: {
    plo: Pick<PLOType, 'id'>;
    course: Pick<CourseType, 'id'>;
    achieved: number;
  }[];
};

export default TranscriptType;
