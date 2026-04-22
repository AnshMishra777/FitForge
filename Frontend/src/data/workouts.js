// FitForge — 26 exercises across 5 categories, 4 full programs

export const EXERCISES = [
  /* ── PUSH ─────────────────────────────────────────── */
  {
    id: 'push_up', name: 'Push-Up', muscle: 'Chest · Triceps · Shoulders', category: 'push',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&q=80',
    cues: ['Hands just outside shoulder-width','Keep core braced throughout','Lower chest to 1" from floor','Press to full lockout at top'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'bench_press', name: 'Bench Press', muscle: 'Chest · Triceps · Front Delts', category: 'push',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    cues: ['Retract & depress scapula','Bar touches lower chest','Drive feet hard into floor','Controlled 2s descent'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'overhead_press', name: 'Overhead Press', muscle: 'Shoulders · Triceps · Upper Chest', category: 'push',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    cues: ['Brace core like a plank','Bar path is perfectly vertical','Push head through at lockout','Re-rack by hinging at hips'],
    defaultSets: 3, defaultReps: 10, rest: 90,
  },
  {
    id: 'dumbbell_fly', name: 'Dumbbell Fly', muscle: 'Chest (isolation)', category: 'push',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    cues: ['Slight fixed elbow bend','Feel deep stretch at bottom','Squeeze pecs hard at top','Arc motion, not press'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'tricep_dip', name: 'Tricep Dip', muscle: 'Triceps · Lower Chest', category: 'push',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    cues: ['Lean slightly forward for chest','Keep elbows tracking back','Lower until 90° elbow bend','Full lockout on the press'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'lateral_raise', name: 'Lateral Raise', muscle: 'Side Deltoid', category: 'push',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    cues: ['Slight forward torso lean','Lead movement with elbows','Stop exactly at shoulder height','Take 3s to lower the weight'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },

  /* ── PULL ─────────────────────────────────────────── */
  {
    id: 'pull_up', name: 'Pull-Up', muscle: 'Lats · Biceps · Rear Delts', category: 'pull',
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=600&q=80',
    cues: ['Start from a full dead hang','Depress shoulders first','Pull elbows to pockets','Chin clears the bar cleanly'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'barbell_row', name: 'Barbell Row', muscle: 'Mid Back · Lats · Biceps', category: 'pull',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    cues: ['Hinge to ~45° torso angle','Pull bar to lower sternum','Squeeze shoulder blades hard','No hip drive — strict form'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'lat_pulldown', name: 'Lat Pulldown', muscle: 'Lats · Teres Major · Biceps', category: 'pull',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80',
    cues: ['Wide overhand grip','Slight backward lean','Pull bar to upper chest','Allow full stretch at top'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'seated_row', name: 'Seated Cable Row', muscle: 'Mid Back · Rhomboids · Lats', category: 'pull',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    cues: ['Sit tall with chest up','Pull handle to lower sternum','Retract shoulder blades fully','Reach forward for full stretch'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'bicep_curl', name: 'Barbell Curl', muscle: 'Biceps · Brachialis', category: 'pull',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    cues: ['Elbows pinned to sides','Supinate wrist fully at top','Squeeze hard for 1 second','3-second controlled eccentric'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'face_pull', name: 'Face Pull', muscle: 'Rear Delts · Traps · Rotator Cuff', category: 'pull',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    cues: ['Set cable at eye level','Pull rope to face, elbows high','Externally rotate at end range','Slow and deliberate always'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },

  /* ── LEGS ─────────────────────────────────────────── */
  {
    id: 'squat', name: 'Back Squat', muscle: 'Quads · Glutes · Hamstrings · Core', category: 'legs',
    image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&q=80',
    cues: ['High or low bar position','Feet shoulder-width, toes out','Break parallel on every rep','Drive knees out over toes'],
    defaultSets: 4, defaultReps: 6, rest: 120,
  },
  {
    id: 'deadlift', name: 'Deadlift', muscle: 'Hamstrings · Glutes · Erectors · Traps', category: 'legs',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
    cues: ['Bar over mid-foot always','Big breath — brace hard','Think "push floor away"','Lock hips out at top fully'],
    defaultSets: 4, defaultReps: 5, rest: 180,
  },
  {
    id: 'lunge', name: 'Walking Lunge', muscle: 'Quads · Glutes · Hip Flexors', category: 'legs',
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=600&q=80',
    cues: ['Take a large forward step','Back knee nearly touches floor','Keep torso perfectly upright','Push through front heel to rise'],
    defaultSets: 3, defaultReps: 20, rest: 60,
  },
  {
    id: 'leg_press', name: 'Leg Press', muscle: 'Quads · Glutes · Calves', category: 'legs',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    cues: ['Feet mid-height on platform','Do NOT lock knees out','Full range every repetition','2-second controlled negative'],
    defaultSets: 3, defaultReps: 12, rest: 90,
  },
  {
    id: 'rdl', name: 'Romanian Deadlift', muscle: 'Hamstrings · Glutes · Erectors', category: 'legs',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    cues: ['Slight soft bend in knees','Push hips back, not down','Bar stays close to legs','Feel hamstring stretch fully'],
    defaultSets: 3, defaultReps: 10, rest: 90,
  },
  {
    id: 'calf_raise', name: 'Calf Raise', muscle: 'Gastrocnemius · Soleus', category: 'legs',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    cues: ['Full stretch at the bottom','Pause 1s at the peak','4-second slow eccentric','No bouncing at the bottom'],
    defaultSets: 4, defaultReps: 20, rest: 45,
  },

  /* ── CORE ─────────────────────────────────────────── */
  {
    id: 'plank', name: 'Plank', muscle: 'Transverse Abs · Obliques · Glutes', category: 'core',
    image: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=600&q=80',
    cues: ['Forearms parallel, elbows under shoulders','Hips perfectly level — no sag','Squeeze abs, glutes, quads hard','Breathe steadily throughout'],
    defaultSets: 3, defaultReps: 1, rest: 60, isTime: true, duration: 45,
  },
  {
    id: 'crunch', name: 'Crunch', muscle: 'Rectus Abdominis', category: 'core',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    cues: ['Hands lightly behind ears','Curl shoulders off the mat','Do NOT pull on neck at all','Squeeze abs hard at the top'],
    defaultSets: 3, defaultReps: 20, rest: 45,
  },
  {
    id: 'leg_raise', name: 'Hanging Leg Raise', muscle: 'Lower Abs · Hip Flexors', category: 'core',
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=600&q=80',
    cues: ['Start from full dead hang','No kipping or swinging','Raise legs to 90° or beyond','Lower slowly and with control'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'mountain_climber', name: 'Mountain Climber', muscle: 'Core · Cardio · Hip Flexors', category: 'core',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&q=80',
    cues: ['High plank, wrists under shoulders','Drive alternating knees to chest','Move fast but keep hips stable','Breathe rhythmically throughout'],
    defaultSets: 3, defaultReps: 30, rest: 45,
  },

  /* ── CARDIO ───────────────────────────────────────── */
  {
    id: 'burpee', name: 'Burpee', muscle: 'Full Body · Cardiovascular', category: 'cardio',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    cues: ['Squat down, hands to floor','Jump feet back to plank','Optional push-up at bottom','Explosive jump up, clap overhead'],
    defaultSets: 3, defaultReps: 10, rest: 60,
  },
  {
    id: 'jump_rope', name: 'Jump Rope', muscle: 'Calves · Cardio · Coordination', category: 'cardio',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80',
    cues: ['Stay light on your toes','Make small, efficient jumps','Rotation comes from the wrists','Stay relaxed in shoulders and arms'],
    defaultSets: 3, defaultReps: 1, rest: 60, isTime: true, duration: 60,
  },
  {
    id: 'box_jump', name: 'Box Jump', muscle: 'Power · Quads · Glutes · Calves', category: 'cardio',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    cues: ['Swing arms explosively forward','Jump from hip extension fully','Land softly, absorb with legs','Always step down — never jump'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
]

export const PROGRAMS = [
  {
    id: 'beginner',
    name: 'Beginner Fundamentals',
    level: 'Beginner', levelColor: '#22c55e',
    duration: '8 Weeks', daysPerWeek: 3,
    goal: 'Build Foundation',
    description: 'Master the essential movement patterns and build a rock-solid foundation. Designed for those just starting their fitness journey.',
    schedule: [
      { day: 1, label: 'Full Body A', exercises: [
        { exerciseId: 'push_up',    sets: 3, reps: 10 },
        { exerciseId: 'squat',      sets: 3, reps: 12 },
        { exerciseId: 'pull_up',    sets: 3, reps: 5  },
        { exerciseId: 'lunge',      sets: 2, reps: 12 },
        { exerciseId: 'plank',      sets: 3, reps: 1, isTime: true, duration: 30 },
      ]},
      { day: 2, label: 'Rest', exercises: [] },
      { day: 3, label: 'Full Body B', exercises: [
        { exerciseId: 'bench_press', sets: 3, reps: 8  },
        { exerciseId: 'barbell_row', sets: 3, reps: 8  },
        { exerciseId: 'leg_press',   sets: 3, reps: 12 },
        { exerciseId: 'calf_raise',  sets: 3, reps: 15 },
        { exerciseId: 'crunch',      sets: 3, reps: 15 },
      ]},
      { day: 4, label: 'Rest', exercises: [] },
      { day: 5, label: 'Full Body C', exercises: [
        { exerciseId: 'overhead_press', sets: 3, reps: 8  },
        { exerciseId: 'deadlift',       sets: 3, reps: 5  },
        { exerciseId: 'lat_pulldown',   sets: 3, reps: 10 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 20 },
        { exerciseId: 'burpee',         sets: 2, reps: 8  },
      ]},
      { day: 6, label: 'Rest', exercises: [] },
      { day: 7, label: 'Rest', exercises: [] },
    ]
  },
  {
    id: 'hypertrophy',
    name: 'Hypertrophy Split',
    level: 'Intermediate', levelColor: '#3b82f6',
    duration: '12 Weeks', daysPerWeek: 4,
    goal: 'Muscle Growth',
    description: 'Push/Pull/Legs split optimized for maximal muscle hypertrophy. Requires 1+ year of consistent training experience.',
    schedule: [
      { day: 1, label: 'Push', exercises: [
        { exerciseId: 'bench_press',    sets: 4, reps: 8  },
        { exerciseId: 'overhead_press', sets: 3, reps: 10 },
        { exerciseId: 'dumbbell_fly',   sets: 3, reps: 12 },
        { exerciseId: 'lateral_raise',  sets: 3, reps: 15 },
        { exerciseId: 'tricep_dip',     sets: 3, reps: 12 },
      ]},
      { day: 2, label: 'Pull', exercises: [
        { exerciseId: 'barbell_row',  sets: 4, reps: 8  },
        { exerciseId: 'pull_up',      sets: 4, reps: 8  },
        { exerciseId: 'lat_pulldown', sets: 3, reps: 12 },
        { exerciseId: 'bicep_curl',   sets: 3, reps: 12 },
        { exerciseId: 'face_pull',    sets: 3, reps: 15 },
      ]},
      { day: 3, label: 'Legs', exercises: [
        { exerciseId: 'squat',      sets: 4, reps: 8  },
        { exerciseId: 'rdl',        sets: 3, reps: 10 },
        { exerciseId: 'leg_press',  sets: 3, reps: 12 },
        { exerciseId: 'lunge',      sets: 3, reps: 20 },
        { exerciseId: 'calf_raise', sets: 4, reps: 20 },
      ]},
      { day: 4, label: 'Rest', exercises: [] },
      { day: 5, label: 'Push + Core', exercises: [
        { exerciseId: 'bench_press',    sets: 4, reps: 6  },
        { exerciseId: 'overhead_press', sets: 4, reps: 8  },
        { exerciseId: 'lateral_raise',  sets: 4, reps: 15 },
        { exerciseId: 'plank',          sets: 3, reps: 1, isTime: true, duration: 45 },
        { exerciseId: 'leg_raise',      sets: 3, reps: 12 },
      ]},
      { day: 6, label: 'Rest', exercises: [] },
      { day: 7, label: 'Rest', exercises: [] },
    ]
  },
  {
    id: 'strength',
    name: 'Powerlifting Base',
    level: 'Advanced', levelColor: '#ff5a1f',
    duration: '16 Weeks', daysPerWeek: 4,
    goal: 'Max Strength',
    description: 'Periodized program built around squat, bench, and deadlift. Pure strength development for experienced athletes only.',
    schedule: [
      { day: 1, label: 'Squat Day', exercises: [
        { exerciseId: 'squat',          sets: 5, reps: 5  },
        { exerciseId: 'bench_press',    sets: 3, reps: 8  },
        { exerciseId: 'leg_press',      sets: 3, reps: 10 },
        { exerciseId: 'lunge',          sets: 3, reps: 12 },
        { exerciseId: 'plank',          sets: 3, reps: 1, isTime: true, duration: 60 },
      ]},
      { day: 2, label: 'Rest', exercises: [] },
      { day: 3, label: 'Bench Day', exercises: [
        { exerciseId: 'bench_press',    sets: 5, reps: 5  },
        { exerciseId: 'overhead_press', sets: 4, reps: 6  },
        { exerciseId: 'dumbbell_fly',   sets: 3, reps: 10 },
        { exerciseId: 'tricep_dip',     sets: 4, reps: 10 },
        { exerciseId: 'lateral_raise',  sets: 3, reps: 15 },
      ]},
      { day: 4, label: 'Rest', exercises: [] },
      { day: 5, label: 'Deadlift Day', exercises: [
        { exerciseId: 'deadlift',     sets: 5, reps: 3  },
        { exerciseId: 'barbell_row',  sets: 4, reps: 6  },
        { exerciseId: 'rdl',          sets: 3, reps: 8  },
        { exerciseId: 'pull_up',      sets: 4, reps: 6  },
        { exerciseId: 'face_pull',    sets: 3, reps: 15 },
      ]},
      { day: 6, label: 'Accessory', exercises: [
        { exerciseId: 'seated_row',      sets: 4, reps: 10 },
        { exerciseId: 'bicep_curl',      sets: 4, reps: 12 },
        { exerciseId: 'calf_raise',      sets: 5, reps: 20 },
        { exerciseId: 'leg_raise',       sets: 4, reps: 15 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 30 },
      ]},
      { day: 7, label: 'Rest', exercises: [] },
    ]
  },
  {
    id: 'hiit',
    name: 'HIIT Shred',
    level: 'Intermediate', levelColor: '#ffcc00',
    duration: '6 Weeks', daysPerWeek: 5,
    goal: 'Fat Loss + Cardio',
    description: 'High-intensity interval training fused with strength work. Maximum calorie burn while preserving hard-earned muscle.',
    schedule: [
      { day: 1, label: 'Upper HIIT', exercises: [
        { exerciseId: 'burpee',           sets: 4, reps: 12 },
        { exerciseId: 'push_up',          sets: 4, reps: 15 },
        { exerciseId: 'pull_up',          sets: 3, reps: 8  },
        { exerciseId: 'mountain_climber', sets: 4, reps: 30 },
        { exerciseId: 'bench_press',      sets: 3, reps: 10 },
      ]},
      { day: 2, label: 'Lower HIIT', exercises: [
        { exerciseId: 'box_jump',   sets: 4, reps: 10 },
        { exerciseId: 'squat',      sets: 4, reps: 12 },
        { exerciseId: 'lunge',      sets: 3, reps: 24 },
        { exerciseId: 'calf_raise', sets: 3, reps: 25 },
        { exerciseId: 'burpee',     sets: 3, reps: 10 },
      ]},
      { day: 3, label: 'Active Rest', exercises: [] },
      { day: 4, label: 'Full Body HIIT', exercises: [
        { exerciseId: 'burpee',           sets: 5, reps: 10 },
        { exerciseId: 'box_jump',         sets: 4, reps: 8  },
        { exerciseId: 'push_up',          sets: 3, reps: 20 },
        { exerciseId: 'jump_rope',        sets: 3, reps: 1, isTime: true, duration: 60 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 40 },
      ]},
      { day: 5, label: 'Cardio + Core', exercises: [
        { exerciseId: 'jump_rope',  sets: 5, reps: 1, isTime: true, duration: 60 },
        { exerciseId: 'plank',      sets: 4, reps: 1, isTime: true, duration: 45 },
        { exerciseId: 'crunch',     sets: 4, reps: 25 },
        { exerciseId: 'leg_raise',  sets: 4, reps: 15 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 30 },
      ]},
      { day: 6, label: 'Rest', exercises: [] },
      { day: 7, label: 'Rest', exercises: [] },
    ]
  },
]

export const getExerciseById = (id) => EXERCISES.find(e => e.id === id)
export const getProgramById  = (id) => PROGRAMS.find(p => p.id === id)