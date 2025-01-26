interface CourseRecommendation {
  title: string;
  path: string;
  reason: string;
  confidence: number;
}

export const getRecommendedCourses = (
  strengths: string[] = [], 
  weaknesses: string[] = []
): CourseRecommendation[] => {
  const recommendations: CourseRecommendation[] = [];
  
  // Map interests/weaknesses to relevant courses
  const courseMapping = {
    'programming': ['full-stack', 'python', 'mobile-dev'],
    'mathematics': ['ai-ml', 'data-science', 'blockchain'],
    'design': ['ui-ux', 'digital-marketing'],
    'security': ['cybersecurity', 'blockchain', 'cloud-native'],
    'analytics': ['data-science', 'data-engineering', 'ai-ml'],
    'cloud': ['aws', 'cloud-native', 'devops'],
    'communication': ['digital-marketing', 'ui-ux'],
    'problem solving': ['full-stack', 'ai-ml', 'data-science'],
    'networking': ['cybersecurity', 'aws', 'cloud-native'],
    'business': ['digital-marketing', 'blockchain', 'data-science']
  };

  // Recommend courses based on strengths to leverage them
  strengths.forEach(strength => {
    const relevantCourses = courseMapping[strength.toLowerCase() as keyof typeof courseMapping] || [];
    relevantCourses.forEach(coursePath => {
      recommendations.push({
        title: coursePath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        path: coursePath,
        reason: `Leverages your strength in ${strength}`,
        confidence: 0.8
      });
    });
  });

  // Recommend courses based on weaknesses to improve them
  weaknesses.forEach(weakness => {
    const relevantCourses = courseMapping[weakness.toLowerCase() as keyof typeof courseMapping] || [];
    relevantCourses.forEach(coursePath => {
      recommendations.push({
        title: coursePath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        path: coursePath,
        reason: `Helps improve your ${weakness} skills`,
        confidence: 0.9
      });
    });
  });

  // Remove duplicates and sort by confidence
  const uniqueRecommendations = recommendations.reduce((acc, curr) => {
    const exists = acc.find(r => r.path === curr.path);
    if (!exists) acc.push(curr);
    return acc;
  }, [] as CourseRecommendation[]);

  return uniqueRecommendations.sort((a, b) => b.confidence - a.confidence);
};