import {ManyCriteria} from '@app/models/criteria';
import assessmentService from '@app/services/assessment.service';
import {AssessmentType, ActivityTypeType, CLOType} from '@app/types';
import {useState, useEffect} from 'react';

/** Hook that provides assessment details for the given course
 * @param courseId ID of the course to fetch assessments for
 * @param deps Dependency list
 */
export default function useAssessments(
  courseId: string,
  deps: Array<unknown> = [],
) {
  const [assessments, setAssessments] = useState<AssessmentType[]>();
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [clos, setClos] = useState<CLOType[]>();
  useEffect(() => {
    const crit = new ManyCriteria<AssessmentType>();
    crit.addRelation('clo');
    crit.addRelation('type');
    crit.addCondition('course', courseId);
    assessmentService.get(crit).then(r => {
      const t: ActivityTypeType[] = [];
      const c: CLOType[] = [];
      for (const d of r.data) {
        if (!t.find(t => t.id === d.type.id)) {
          t.push(d.type);
        }
        if (!c.find(c => c.id === d.clo.id)) {
          c.push(d.clo);
        }
      }
      setTypes(t);
      setClos(c.sort((a, b) => a.number - b.number));
      setAssessments(r.data);
    });
  }, deps);
  return {assessments, types, clos};
}
