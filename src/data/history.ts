// export type HistoryItem = {
//     id: string
//     title: string
//     href: string
//     timestamp: string
// }
//
// export const sampleHistory: HistoryItem[] = [
//     { id: "1", title: "Calm Anxiety — Evening Wind Down", href: "/player?session=1", timestamp: "2026-07-26T21:10:00Z" },
//     { id: "2", title: "Deep Focus for ADHD", href: "/player?session=2", timestamp: "2026-07-26T14:32:00Z" },
//     { id: "3", title: "Weightless — Marconi Union", href: "/player?session=3", timestamp: "2026-07-25T22:47:00Z" },
//     { id: "4", title: "Migraine Relief — Low Frequency", href: "/player?session=4", timestamp: "2026-07-25T09:15:00Z" },
//     { id: "5", title: "Motivation Boost — Morning Energy", href: "/player?session=5", timestamp: "2026-07-24T07:05:00Z" },
//     { id: "6", title: "Sleep — Insomnia Support", href: "/player?session=6", timestamp: "2026-07-23T23:58:00Z" },
//     { id: "7", title: "Clair de Lune — Debussy", href: "/player?session=7", timestamp: "2026-07-23T18:20:00Z" },
//     { id: "8", title: "Stress Recovery — Post-Workout", href: "/player?session=8", timestamp: "2026-07-22T16:41:00Z" },
//     { id: "9", title: "Chronic Pain — Grounding Session", href: "/player?session=9", timestamp: "2026-07-21T20:12:00Z" },
//     { id: "10", title: "Weightless (Pt. 2) — Marconi Union", href: "/player?session=10", timestamp: "2026-07-20T08:30:00Z" },
//     { id: "11", title: "Panic Attack — Grounding Breath", href: "/player?session=11", timestamp: "2026-07-19T13:05:00Z" },
//     { id: "12", title: "Gymnopédie No. 1 — Satie", href: "/player?session=12", timestamp: "2026-07-19T07:44:00Z" },
//     { id: "13", title: "Study Session — Alpha Waves", href: "/player?session=13", timestamp: "2026-07-18T19:22:00Z" },
//     { id: "14", title: "Tinnitus Relief — White Noise Blend", href: "/player?session=14", timestamp: "2026-07-18T11:03:00Z" },
//     { id: "15", title: "Morning Motivation — Upbeat Mix", href: "/player?session=15", timestamp: "2026-07-17T06:50:00Z" },
//     { id: "16", title: "Deep Sleep — Delta Waves", href: "/player?session=16", timestamp: "2026-07-16T23:40:00Z" },
//     { id: "17", title: "River Flows in You — Yiruma", href: "/player?session=17", timestamp: "2026-07-16T17:12:00Z" },
//     { id: "18", title: "Chemo Recovery — Gentle Ambient", href: "/player?session=18", timestamp: "2026-07-15T15:30:00Z" },
//     { id: "19", title: "PTSD Support — Safe Space Session", href: "/player?session=19", timestamp: "2026-07-15T09:18:00Z" },
//     { id: "20", title: "Sad Mood — Rainy Day Piano", href: "/player?session=20", timestamp: "2026-07-14T21:55:00Z" },
//     { id: "21", title: "Fibromyalgia — Pain Distraction Mix", href: "/player?session=21", timestamp: "2026-07-14T12:47:00Z" },
//     { id: "22", title: "Hypertension — Slow Heart Rate Session", href: "/player?session=22", timestamp: "2026-07-13T18:05:00Z" },
//     { id: "23", title: "Comptine d'un autre été — Yann Tiersen", href: "/player?session=23", timestamp: "2026-07-13T08:22:00Z" },
//     { id: "24", title: "Happy Mood — Feel Good Playlist", href: "/player?session=24", timestamp: "2026-07-12T20:10:00Z" },
//     { id: "25", title: "IBS Relief — Gut-Calming Frequencies", href: "/player?session=25", timestamp: "2026-07-12T10:35:00Z" },
//     { id: "26", title: "Nostalgic Mood — 2000s Throwback", href: "/player?session=26", timestamp: "2026-07-11T22:18:00Z" },
//     { id: "27", title: "Arthritis — Low Impact Relaxation", href: "/player?session=27", timestamp: "2026-07-11T14:02:00Z" },
//     { id: "28", title: "Experience — Ludovico Einaudi", href: "/player?session=28", timestamp: "2026-07-10T19:47:00Z" },
//     { id: "29", title: "Burnout Recovery — Slow Down Session", href: "/player?session=29", timestamp: "2026-07-10T09:30:00Z" },
//     { id: "30", title: "Insomnia — Deep Sleep Cycle", href: "/player?session=30", timestamp: "2026-07-09T23:59:00Z" },
//     { id: "31", title: "Romantic Mood — Evening Slow Jams", href: "/player?session=31", timestamp: "2026-07-09T21:14:00Z" },
//     { id: "32", title: "High Blood Pressure — Calm Breathing", href: "/player?session=32", timestamp: "2026-07-08T16:40:00Z" },
//     { id: "33", title: "Nuvole Bianche — Einaudi", href: "/player?session=33", timestamp: "2026-07-08T08:05:00Z" },
//     { id: "34", title: "Angry Mood — Release & Reset", href: "/player?session=34", timestamp: "2026-07-07T20:22:00Z" },
//     { id: "35", title: "Depression Support — Gentle Uplift", href: "/player?session=35", timestamp: "2026-07-07T11:50:00Z" },
//     { id: "36", title: "Weightless (Pt. 3) — Marconi Union", href: "/player?session=36", timestamp: "2026-07-06T19:15:00Z" },
//     { id: "37", title: "Studying — Lo-fi Focus Beats", href: "/player?session=37", timestamp: "2026-07-06T10:08:00Z" },
//     { id: "38", title: "Post-Surgery Recovery — Ambient Calm", href: "/player?session=38", timestamp: "2026-07-05T22:44:00Z" },
//     { id: "39", title: "Energetic Mood — Workout Pump-Up", href: "/player?session=39", timestamp: "2026-07-05T07:20:00Z" },
//     { id: "40", title: "Sleep Apnea — Breath-Paced Session", href: "/player?session=40", timestamp: "2026-07-04T23:05:00Z" },
// ]