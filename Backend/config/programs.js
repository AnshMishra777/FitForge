module.exports = [
  {
    id: 'beginner', name: 'Beginner Fundamentals', level: 'Beginner', levelColor: '#22c55e',
    duration: '8 Weeks', daysPerWeek: 3, goal: 'Build Foundation',
    description: 'Master essential movement patterns and build a rock-solid foundation. Designed for those just starting their fitness journey.',
    schedule: [
      { day:1, label:'Full Body A', exercises:[{exerciseId:'push_up',sets:3,reps:10},{exerciseId:'squat',sets:3,reps:12},{exerciseId:'pull_up',sets:3,reps:5},{exerciseId:'lunge',sets:2,reps:12},{exerciseId:'plank',sets:3,reps:1,isTime:true,duration:30}] },
      { day:2, label:'Rest', exercises:[] },
      { day:3, label:'Full Body B', exercises:[{exerciseId:'bench_press',sets:3,reps:8},{exerciseId:'barbell_row',sets:3,reps:8},{exerciseId:'leg_press',sets:3,reps:12},{exerciseId:'calf_raise',sets:3,reps:15},{exerciseId:'crunch',sets:3,reps:15}] },
      { day:4, label:'Rest', exercises:[] },
      { day:5, label:'Full Body C', exercises:[{exerciseId:'overhead_press',sets:3,reps:8},{exerciseId:'deadlift',sets:3,reps:5},{exerciseId:'lat_pulldown',sets:3,reps:10},{exerciseId:'mountain_climber',sets:3,reps:20},{exerciseId:'burpee',sets:2,reps:8}] },
      { day:6, label:'Rest', exercises:[] },
      { day:7, label:'Rest', exercises:[] },
    ]
  },
  {
    id: 'hypertrophy', name: 'Hypertrophy Split', level: 'Intermediate', levelColor: '#3b82f6',
    duration: '12 Weeks', daysPerWeek: 4, goal: 'Muscle Growth',
    description: 'Push/Pull/Legs split optimized for maximal muscle hypertrophy. Requires 1+ year of consistent training experience.',
    schedule: [
      { day:1, label:'Push', exercises:[{exerciseId:'bench_press',sets:4,reps:8},{exerciseId:'overhead_press',sets:3,reps:10},{exerciseId:'dumbbell_fly',sets:3,reps:12},{exerciseId:'lateral_raise',sets:3,reps:15},{exerciseId:'tricep_dip',sets:3,reps:12}] },
      { day:2, label:'Pull', exercises:[{exerciseId:'barbell_row',sets:4,reps:8},{exerciseId:'pull_up',sets:4,reps:8},{exerciseId:'lat_pulldown',sets:3,reps:12},{exerciseId:'bicep_curl',sets:3,reps:12},{exerciseId:'face_pull',sets:3,reps:15}] },
      { day:3, label:'Legs', exercises:[{exerciseId:'squat',sets:4,reps:8},{exerciseId:'rdl',sets:3,reps:10},{exerciseId:'leg_press',sets:3,reps:12},{exerciseId:'lunge',sets:3,reps:20},{exerciseId:'calf_raise',sets:4,reps:20}] },
      { day:4, label:'Rest', exercises:[] },
      { day:5, label:'Push + Core', exercises:[{exerciseId:'bench_press',sets:4,reps:6},{exerciseId:'overhead_press',sets:4,reps:8},{exerciseId:'lateral_raise',sets:4,reps:15},{exerciseId:'plank',sets:3,reps:1,isTime:true,duration:45},{exerciseId:'leg_raise',sets:3,reps:12}] },
      { day:6, label:'Rest', exercises:[] },
      { day:7, label:'Rest', exercises:[] },
    ]
  },
  {
    id: 'strength', name: 'Powerlifting Base', level: 'Advanced', levelColor: '#ff5a1f',
    duration: '16 Weeks', daysPerWeek: 4, goal: 'Max Strength',
    description: 'Periodized program built around squat, bench, and deadlift. Pure strength development for experienced athletes only.',
    schedule: [
      { day:1, label:'Squat Day', exercises:[{exerciseId:'squat',sets:5,reps:5},{exerciseId:'bench_press',sets:3,reps:8},{exerciseId:'leg_press',sets:3,reps:10},{exerciseId:'lunge',sets:3,reps:12},{exerciseId:'plank',sets:3,reps:1,isTime:true,duration:60}] },
      { day:2, label:'Rest', exercises:[] },
      { day:3, label:'Bench Day', exercises:[{exerciseId:'bench_press',sets:5,reps:5},{exerciseId:'overhead_press',sets:4,reps:6},{exerciseId:'dumbbell_fly',sets:3,reps:10},{exerciseId:'tricep_dip',sets:4,reps:10},{exerciseId:'lateral_raise',sets:3,reps:15}] },
      { day:4, label:'Rest', exercises:[] },
      { day:5, label:'Deadlift Day', exercises:[{exerciseId:'deadlift',sets:5,reps:3},{exerciseId:'barbell_row',sets:4,reps:6},{exerciseId:'rdl',sets:3,reps:8},{exerciseId:'pull_up',sets:4,reps:6},{exerciseId:'face_pull',sets:3,reps:15}] },
      { day:6, label:'Accessory', exercises:[{exerciseId:'seated_row',sets:4,reps:10},{exerciseId:'bicep_curl',sets:4,reps:12},{exerciseId:'calf_raise',sets:5,reps:20},{exerciseId:'leg_raise',sets:4,reps:15},{exerciseId:'mountain_climber',sets:3,reps:30}] },
      { day:7, label:'Rest', exercises:[] },
    ]
  },
  {
    id: 'hiit', name: 'HIIT Shred', level: 'Intermediate', levelColor: '#ffcc00',
    duration: '6 Weeks', daysPerWeek: 5, goal: 'Fat Loss + Cardio',
    description: 'High-intensity interval training fused with strength work. Maximum calorie burn while preserving hard-earned muscle.',
    schedule: [
      { day:1, label:'Upper HIIT', exercises:[{exerciseId:'burpee',sets:4,reps:12},{exerciseId:'push_up',sets:4,reps:15},{exerciseId:'pull_up',sets:3,reps:8},{exerciseId:'mountain_climber',sets:4,reps:30},{exerciseId:'bench_press',sets:3,reps:10}] },
      { day:2, label:'Lower HIIT', exercises:[{exerciseId:'box_jump',sets:4,reps:10},{exerciseId:'squat',sets:4,reps:12},{exerciseId:'lunge',sets:3,reps:24},{exerciseId:'calf_raise',sets:3,reps:25},{exerciseId:'burpee',sets:3,reps:10}] },
      { day:3, label:'Active Rest', exercises:[] },
      { day:4, label:'Full Body HIIT', exercises:[{exerciseId:'burpee',sets:5,reps:10},{exerciseId:'box_jump',sets:4,reps:8},{exerciseId:'push_up',sets:3,reps:20},{exerciseId:'jump_rope',sets:3,reps:1,isTime:true,duration:60},{exerciseId:'mountain_climber',sets:3,reps:40}] },
      { day:5, label:'Cardio + Core', exercises:[{exerciseId:'jump_rope',sets:5,reps:1,isTime:true,duration:60},{exerciseId:'plank',sets:4,reps:1,isTime:true,duration:45},{exerciseId:'crunch',sets:4,reps:25},{exerciseId:'leg_raise',sets:4,reps:15},{exerciseId:'mountain_climber',sets:3,reps:30}] },
      { day:6, label:'Rest', exercises:[] },
      { day:7, label:'Rest', exercises:[] },
    ]
  },
]