export const B2_LISTENING_TASKS = [
  // ─── SECTION 1 ───────────────────────────────────────────────────────────────

  {
    id: 1,
    section: 1,
    title: 'Phone enquiry about a gym membership',
    audioScript: `A: Hi, I'm calling about joining the gym. Can you tell me about membership options?
B: Sure. We have three plans. Basic is thirty-two pounds a month, standard is forty-five, and premium is sixty.
A: What does premium include that standard doesn't?
B: Premium adds two personal training sessions per month. Also, parking is only free for premium members — standard members pay one fifty per visit.
A: What time do you open on weekdays?
B: Six in the morning. And there's a one-off joining fee of twenty pounds for all plans.
A: Great, I'll go with the standard plan.`,
    questions: [
      {
        id: 1,
        q: 'How much does the standard membership cost per month?',
        options: ['£32', '£45', '£60', '£75'],
        answer: 1,
        explanation: 'The receptionist states "standard is forty-five", making £45 the correct answer.',
      },
      {
        id: 2,
        q: 'What extra benefit do premium members receive compared to standard?',
        options: ['Free parking only', 'Access to the pool', 'Two personal training sessions per month', 'Unlimited classes'],
        answer: 2,
        explanation: 'The receptionist says "Premium adds two personal training sessions per month".',
      },
      {
        id: 3,
        q: 'What time does the gym open on weekdays?',
        options: ['5:00 am', '6:00 am', '7:00 am', '8:00 am'],
        answer: 1,
        explanation: 'The receptionist states "Six in the morning" for weekday opening.',
      },
      {
        id: 4,
        q: 'Which plan does the caller decide to take?',
        options: ['Basic', 'Standard', 'Premium', 'She does not decide'],
        answer: 1,
        explanation: 'The caller says "I\'ll go with the standard plan" at the end.',
      },
    ],
    tags: ['section-1', 'phone-call', 'gym', 'daily-life'],
  },

  {
    id: 2,
    section: 1,
    title: 'Flat rental enquiry',
    audioScript: `A: Hi, I'm calling about the two-bedroom flat on Grove Street — is it still available?
B: Yes, it came back on the market last week. It's fully furnished, third floor, no lift. There's one parking space included.
A: What's the monthly rent?
B: Eleven hundred and fifty pounds, which includes water rates. Gas and electricity are separate.
A: I have a cat — is that okay?
B: Cats are fine, but the landlord doesn't allow dogs. The nearest tube station is a seven-minute walk.
A: Can I view it Saturday morning?
B: Of course, I'll book that in.`,
    questions: [
      {
        id: 5,
        q: 'What is included in the monthly rent?',
        options: ['Gas and electricity', 'Water rates', 'Council tax', 'Internet'],
        answer: 1,
        explanation: 'The agent says "eleven hundred and fifty pounds, which includes water rates".',
      },
      {
        id: 6,
        q: 'What is the landlord\'s policy on pets?',
        options: ['No pets allowed', 'Cats and dogs both welcome', 'Cats allowed but not dogs', 'Dogs allowed but not cats'],
        answer: 2,
        explanation: 'The agent says "Cats are fine, but the landlord doesn\'t allow dogs".',
      },
      {
        id: 7,
        q: 'How far is the nearest tube station?',
        options: ['Two minutes', 'Five minutes', 'Seven minutes', 'Ten minutes'],
        answer: 2,
        explanation: 'The agent says "The nearest tube station is a seven-minute walk".',
      },
      {
        id: 8,
        q: 'When does the caller arrange to view the flat?',
        options: ['Thursday morning', 'Thursday afternoon', 'Saturday morning', 'Saturday afternoon'],
        answer: 2,
        explanation: 'The caller asks to view it "Saturday morning" and the agent confirms.',
      },
    ],
    tags: ['section-1', 'flat-rental', 'phone-call', 'housing'],
  },

  {
    id: 3,
    section: 1,
    title: 'Booking a restaurant',
    audioScript: `A: Good evening, The Olive Branch. How can I help?
B: I'd like to book a table for six this Saturday at eight o'clock please.
A: Eight o'clock is available. Can I take a name?
B: Patterson. I should mention one guest has a nut allergy.
A: That's fine, just remind the server when you arrive. For groups of six we do ask for a deposit — fifteen pounds per person.
B: So ninety pounds total? I'll pay online.
A: Perfect. There's also a pay-and-display car park on Market Street, two minutes away, free after six.`,
    questions: [
      {
        id: 9,
        q: 'What time is the reservation made for?',
        options: ['Seven o\'clock', 'Seven-thirty', 'Eight o\'clock', 'Eight-thirty'],
        answer: 2,
        explanation: 'The caller asks for eight o\'clock and the restaurant confirms it is available.',
      },
      {
        id: 10,
        q: 'How much is the total deposit for the booking?',
        options: ['£15', '£60', '£90', '£100'],
        answer: 2,
        explanation: 'The deposit is £15 per person for six people, which the caller correctly calculates as £90.',
      },
      {
        id: 11,
        q: 'How does the caller choose to pay the deposit?',
        options: ['By card over the phone', 'Online', 'In person', 'By bank transfer'],
        answer: 1,
        explanation: 'The caller says "I\'ll pay online" after being told about the deposit.',
      },
      {
        id: 12,
        q: 'What is the parking situation near the restaurant?',
        options: ['Free all day', 'No parking nearby', 'Pay-and-display, free after 6pm, two minutes away', 'Weekends only'],
        answer: 2,
        explanation: 'The host describes a pay-and-display on Market Street, two minutes away, free after six.',
      },
    ],
    tags: ['section-1', 'restaurant', 'booking', 'phone-call'],
  },

  {
    id: 4,
    section: 1,
    title: 'Reporting a lost item',
    audioScript: `A: Westfield security desk, how can I help?
B: I think I've left my bag somewhere in the centre. It's a navy blue canvas tote with a green zip and a red ladybird keyring.
A: And what's inside it?
B: A black leather purse with a gold clasp, my phone charger, and a library book.
A: I think we may have it — there's a navy tote with a ladybird keyring here.
B: Brilliant! Where do I collect it?
A: Ground floor, near the main entrance, look for the blue Information sign. We close at six.`,
    questions: [
      {
        id: 13,
        q: 'What colour is the zip on the lost bag?',
        options: ['Navy blue', 'Black', 'Green', 'Red'],
        answer: 2,
        explanation: 'The caller describes the bag as having "a green zip".',
      },
      {
        id: 14,
        q: 'What keyring is on the outside of the bag?',
        options: ['A blue star', 'A red ladybird', 'A gold clasp', 'A green leaf'],
        answer: 1,
        explanation: 'The caller says there is "a red ladybird keyring" on the outside.',
      },
      {
        id: 15,
        q: 'What item inside the bag helps confirm it belongs to the caller?',
        options: ['A library card', 'A black purse with a gold clasp', 'A laptop', 'A set of keys'],
        answer: 1,
        explanation: 'Among the contents she mentions "a black leather purse with a gold clasp".',
      },
      {
        id: 16,
        q: 'Where should the caller go to collect the bag?',
        options: ['Upper floor food court', 'Second floor security office', 'Ground floor near the main entrance', 'Customer services level three'],
        answer: 2,
        explanation: 'The officer says "Ground floor, near the main entrance, look for the blue Information sign".',
      },
    ],
    tags: ['section-1', 'lost-property', 'phone-call', 'daily-life'],
  },

  // ─── SECTION 2 ───────────────────────────────────────────────────────────────

  {
    id: 5,
    section: 2,
    title: 'Community centre facilities tour',
    audioScript: `Welcome to the Riverside Community Centre. I'm Sandra, the centre manager.

The sports hall to your left can be divided into three courts for badminton or basketball. Bookings open six weeks in advance — it fills up fast at weekends.

The fitness suite is open six in the morning until ten at night, every day. Membership is twenty-eight pounds a month, or eighteen pounds for over-sixties and under-eighteens.

Upstairs there's a café serving hot food until three, and a meeting room that community groups can hire for free with forty-eight hours' notice.`,
    questions: [
      {
        id: 17,
        q: 'How far in advance can the sports hall be booked?',
        options: ['Two weeks', 'Four weeks', 'Six weeks', 'Eight weeks'],
        answer: 2,
        explanation: 'Sandra states "Bookings open six weeks in advance".',
      },
      {
        id: 18,
        q: 'What is the discounted fitness suite membership for over-sixties?',
        options: ['£18', '£22', '£25', '£28'],
        answer: 0,
        explanation: 'Sandra says "eighteen pounds for over-sixties and under-eighteens".',
      },
      {
        id: 19,
        q: 'Until what time does the café serve hot food?',
        options: ['12 noon', '1pm', '3pm', '5pm'],
        answer: 2,
        explanation: 'Sandra says the café serves "hot food until three".',
      },
      {
        id: 20,
        q: 'What do community groups need to hire the meeting room?',
        options: ['Pay a fee', 'Become members', 'Give 48 hours\' notice', 'Apply in writing one week ahead'],
        answer: 2,
        explanation: 'Sandra says groups can hire it "for free with forty-eight hours\' notice".',
      },
    ],
    tags: ['section-2', 'community-centre', 'tour', 'monologue'],
  },

  {
    id: 6,
    section: 2,
    title: 'Council recycling announcement',
    audioScript: `This is a message from Greenfield Borough Council about changes to household recycling from the first of next month.

Glass bottles and jars will no longer be collected from your doorstep. New glass collection points are being installed at supermarket car parks. This is because glass damages sorting machinery at the recycling facility.

We're also introducing weekly food waste collection. You'll receive a small brown kitchen caddy and a larger outdoor bin. Food waste will be collected on the same day as your general rubbish.

Your collection days are not changing, and there's no additional charge for these services.`,
    questions: [
      {
        id: 21,
        q: 'Why is doorstep glass collection ending?',
        options: ['Too heavy for staff', 'Glass damages sorting machinery', 'The council cannot afford it', 'Residents must sort it first'],
        answer: 1,
        explanation: 'The announcement states "glass damages sorting machinery at the recycling facility".',
      },
      {
        id: 22,
        q: 'How often will food waste be collected?',
        options: ['Every two weeks', 'Twice a week', 'Every week', 'Once a month'],
        answer: 2,
        explanation: 'The announcement says "Food waste will be collected on the same day as your general rubbish" — weekly.',
      },
      {
        id: 23,
        q: 'Where will the new glass collection points be located?',
        options: ['Outside schools', 'At supermarket car parks', 'At the recycling centre', 'On the high street'],
        answer: 1,
        explanation: 'The announcement says "New glass collection points are being installed at supermarket car parks".',
      },
      {
        id: 24,
        q: 'What is NOT changing as a result of these updates?',
        options: ['How glass is collected', 'Food waste arrangements', 'Collection days', 'The recycling bin rules'],
        answer: 2,
        explanation: 'The announcement says "Your collection days are not changing".',
      },
    ],
    tags: ['section-2', 'recycling', 'council', 'monologue'],
  },

  {
    id: 7,
    section: 2,
    title: 'Museum audio guide',
    audioScript: `Welcome to the Hartfield Museum of Local History. This tour lasts approximately forty-five minutes, though you're free to spend longer in any gallery.

The museum covers two floors. You're on the ground floor, which runs from prehistoric times to the Industrial Revolution. The upper floor covers the Victorian era to the present day.

In the first gallery, look out for a bronze age burial urn discovered during construction work in 1987. In gallery six, the Victorian Kitchen is a fully reconstructed room from an eighteen-eighties worker's cottage.

The café is upstairs next to gallery nine. Eating and drinking are not permitted elsewhere in the museum.`,
    questions: [
      {
        id: 25,
        q: 'How long does the audio tour last?',
        options: ['About 30 minutes', 'About 45 minutes', 'About an hour', 'About 90 minutes'],
        answer: 1,
        explanation: 'The guide states "This tour lasts approximately forty-five minutes".',
      },
      {
        id: 26,
        q: 'When was the bronze age burial urn discovered?',
        options: ['During a 1342 excavation', 'During construction work in 1987', 'During museum renovation in 2005', 'During a school project'],
        answer: 1,
        explanation: 'The guide says the urn "was discovered during construction work in 1987".',
      },
      {
        id: 27,
        q: 'What is the Victorian Kitchen in gallery six?',
        options: ['A collection of Victorian paintings', 'A fully reconstructed room from an 1880s cottage', 'A wealthy family\'s dining room', 'The oldest exhibit in the museum'],
        answer: 1,
        explanation: 'The guide describes it as "a fully reconstructed room from an eighteen-eighties worker\'s cottage".',
      },
      {
        id: 28,
        q: 'Where is the café located?',
        options: ['Ground floor near the exit', 'In the basement', 'Upstairs next to gallery nine', 'Outside in the courtyard'],
        answer: 2,
        explanation: 'The guide says "The café is upstairs next to gallery nine".',
      },
    ],
    tags: ['section-2', 'museum', 'audio-guide', 'monologue'],
  },

  {
    id: 8,
    section: 2,
    title: 'New employee induction',
    audioScript: `Good morning and welcome to Meridian Healthcare. A few important things before you head to your departments.

Your temporary ID badge lets you access all areas including the car park. Permanent photo IDs will be ready by end of the week.

Core hours for office roles are ten in the morning until three in the afternoon. You must complete thirty-seven hours per week. Any overtime needs advance approval from your line manager.

You must never use personal email for work — this is a serious disciplinary matter. Report any equipment or IT problems using the internal portal, not by emailing individuals directly.`,
    questions: [
      {
        id: 29,
        q: 'What are the core hours all office staff must be present?',
        options: ['9am–5pm', '8am–4pm', '10am–3pm', '9am–3pm'],
        answer: 2,
        explanation: 'The speaker states "Core hours for office roles are ten in the morning until three in the afternoon".',
      },
      {
        id: 30,
        q: 'What does the IT policy say about personal email?',
        options: ['Allowed for informal messages', 'Never to be used for work', 'Permitted for external clients only', 'Allowed as a backup only'],
        answer: 1,
        explanation: 'The speaker says "You must never use personal email for work — this is a serious disciplinary matter".',
      },
      {
        id: 31,
        q: 'When will permanent ID badges be ready?',
        options: ['Today', 'Tomorrow', 'End of the week', 'Next Monday'],
        answer: 2,
        explanation: 'The speaker says "Permanent photo IDs will be ready by end of the week".',
      },
      {
        id: 32,
        q: 'How should employees report IT or equipment problems?',
        options: ['Email their line manager', 'Call the IT department', 'Use the internal portal', 'Fill in a paper form'],
        answer: 2,
        explanation: 'The speaker says "Report any equipment or IT problems using the internal portal, not by emailing individuals directly".',
      },
    ],
    tags: ['section-2', 'workplace', 'induction', 'monologue'],
  },

  // ─── SECTION 3 ───────────────────────────────────────────────────────────────

  {
    id: 9,
    section: 3,
    title: 'Students discussing a research project',
    audioScript: `A: Have you thought about methodology for the urban transport project?
B: Yes — I think mixed methods. Quantitative data from transport statistics plus qualitative interviews with commuters. Dr Chen suggested at least fifteen interviews but I think twenty would be better.
A: Agreed. I could handle the transport authority data — I have a contact from my placement last year.
B: Perfect. I'll design the interview guide and do the ethics submission. That has to be in by end of next week.
A: If it's late we can't start until after Easter. Let's have a draft done by Wednesday.`,
    questions: [
      {
        id: 33,
        q: 'How many interviews do the students decide to aim for?',
        options: ['Ten', 'Fifteen', 'Twenty', 'Twenty-five'],
        answer: 2,
        explanation: 'Student B says "I think twenty would be better" and Student A agrees.',
      },
      {
        id: 34,
        q: 'Who will handle the transport authority data?',
        options: ['Student B', 'Student A, who has a contact there', 'Dr Chen', 'Both students together'],
        answer: 1,
        explanation: 'Student A says "I could handle the transport authority data — I have a contact from my placement last year".',
      },
      {
        id: 35,
        q: 'Who will design the interview guide?',
        options: ['Student A', 'Student B', 'Both together', 'Dr Chen will provide a template'],
        answer: 1,
        explanation: 'Student B says "I\'ll design the interview guide and do the ethics submission".',
      },
      {
        id: 36,
        q: 'What happens if the ethics form is submitted late?',
        options: ['Lower grade', 'Can\'t start until after Easter', 'Need a new supervisor', 'Topic must change'],
        answer: 1,
        explanation: 'Student A warns "If it\'s late we can\'t start until after Easter".',
      },
    ],
    tags: ['section-3', 'students', 'research', 'academic'],
  },

  {
    id: 10,
    section: 3,
    title: 'Tutor feedback on an essay',
    audioScript: `A: So Tom, your essay on the First World War — shall we go through my feedback?
B: Please. I felt I ran out of time towards the end.
A: It shows. Your introduction is strong and your use of primary sources in sections two and three is genuinely impressive. But the conclusion is only four sentences and doesn't address your thesis at all — you've just summarised rather than drawn things together.
B: I knew that was wrong.
A: For next time, plan your conclusion before you start writing. Also, you rely too heavily on one historian — A.J.P. Taylor. Engage with a wider range of perspectives.`,
    questions: [
      {
        id: 37,
        q: 'What is the main problem with the essay?',
        options: ['Unclear introduction', 'Incorrect referencing', 'Conclusion doesn\'t address the thesis', 'Not enough primary sources'],
        answer: 2,
        explanation: 'The tutor says "the conclusion is only four sentences and doesn\'t address your thesis at all".',
      },
      {
        id: 38,
        q: 'What does the tutor praise in the essay?',
        options: ['The conclusion', 'The introduction and use of primary sources', 'The counterarguments', 'The range of historians'],
        answer: 1,
        explanation: 'The tutor says "Your introduction is strong and your use of primary sources in sections two and three is genuinely impressive".',
      },
      {
        id: 39,
        q: 'What planning advice does the tutor give?',
        options: ['Write the introduction last', 'Create the bibliography first', 'Plan the conclusion before starting', 'Draft the middle sections first'],
        answer: 2,
        explanation: 'The tutor advises "plan your conclusion before you start writing".',
      },
      {
        id: 40,
        q: 'What criticism does the tutor make about sources?',
        options: ['Too many primary sources', 'Incorrect citations', 'Relies too heavily on one historian', 'Not enough internet sources'],
        answer: 2,
        explanation: 'The tutor says "you rely too heavily on one historian — A.J.P. Taylor".',
      },
    ],
    tags: ['section-3', 'tutor', 'essay-feedback', 'academic'],
  },

  {
    id: 11,
    section: 3,
    title: 'Group presentation planning',
    audioScript: `A: We've got three weeks. Let's divide the sections — introduction, three content sections, conclusion.
B: I'll take the economic impacts — it links to my dissertation.
A: I'll cover social impacts. I've already started reading around it.
C: That leaves me with environmental impacts. For slides, can we use the university branding? Saves arguments about design.
A: Good idea. Each of us makes our own slides using that template.
B: When do we reconvene to check progress?
A: Two weeks from today — that leaves a week to finalise slides before the presentation.`,
    questions: [
      {
        id: 41,
        q: 'Why does Speaker B choose the economic impacts section?',
        options: ['It is the easiest', 'It links to their dissertation', 'No one else wanted it', 'The tutor assigned it'],
        answer: 1,
        explanation: 'Speaker B says "I\'ll take the economic impacts — it links to my dissertation".',
      },
      {
        id: 42,
        q: 'What do they agree to use for their slides?',
        options: ['A template designed by Speaker B', 'An animated design', 'The university branding', 'Each person chooses their own style'],
        answer: 2,
        explanation: 'Speaker C suggests "Can we use the university branding? Saves arguments about design" and the group agrees.',
      },
      {
        id: 43,
        q: 'Which section will Speaker A cover?',
        options: ['Economic impacts', 'Social impacts', 'Environmental impacts', 'The introduction'],
        answer: 1,
        explanation: 'Speaker A says "I\'ll cover social impacts. I\'ve already started reading around it".',
      },
      {
        id: 44,
        q: 'When do they agree to meet again?',
        options: ['In one week', 'In two weeks', 'In three weeks', 'The day before the presentation'],
        answer: 1,
        explanation: 'Speaker A says "Two weeks from today — that leaves a week to finalise slides before the presentation".',
      },
    ],
    tags: ['section-3', 'group-project', 'planning', 'academic'],
  },

  {
    id: 12,
    section: 3,
    title: 'Preparing for a seminar',
    audioScript: `A: Have you done the reading for Thursday? It's on framing effects in media.
B: Only the first article. I got lost with the theory in the second one.
A: The key point is that the way a story is framed affects how audiences interpret it, even when the facts are identical. I think Dr Okafor will ask us to apply it to a real example.
B: I was thinking Brexit coverage. Different papers framed the same events very differently.
A: Vaccine hesitancy is more directly linked — the reading specifically covers health communication.
B: Good point. Let's both prepare something on that so we can back each other up.`,
    questions: [
      {
        id: 45,
        q: 'What is the main concept from the reading?',
        options: ['How journalists choose stories', 'How framing affects audience interpretation', 'Whether audiences trust online news', 'Social media and news consumption'],
        answer: 1,
        explanation: 'Student A summarises: "the way a story is framed affects how audiences interpret it, even when the facts are identical".',
      },
      {
        id: 46,
        q: 'Which example do they decide to focus on for the seminar?',
        options: ['Brexit coverage', 'Social media misinformation', 'Vaccine hesitancy', 'Climate change reporting'],
        answer: 2,
        explanation: 'Student A points out vaccine hesitancy is "more directly linked" to the reading on health communication, so they agree on that.',
      },
      {
        id: 47,
        q: 'Why does Student A prefer the vaccine hesitancy example?',
        options: ['It is more recent', 'The reading specifically covers health communication', 'It is easier to research', 'Dr Okafor suggested it'],
        answer: 1,
        explanation: 'Student A says "Vaccine hesitancy is more directly linked — the reading specifically covers health communication".',
      },
      {
        id: 48,
        q: 'What does Student B find difficult about the second article?',
        options: ['The length', 'The theoretical framework', 'The examples used', 'The referencing style'],
        answer: 1,
        explanation: 'Student B says "I got lost with the theory in the second one", referring to the theoretical framework.',
      },
    ],
    tags: ['section-3', 'seminar', 'media', 'academic'],
  },

  // ─── SECTION 4 ───────────────────────────────────────────────────────────────

  {
    id: 13,
    section: 4,
    title: 'Lecture on urban green spaces',
    audioScript: `Today's lecture examines urban green spaces and their effects on public health.

Psychologist Rachel Kaplan's attention restoration theory proposes that natural environments allow the brain to recover from mental fatigue caused by sustained directed attention — the kind we use constantly in city work environments.

A landmark 2019 UK study tracking over ninety thousand participants found that those who used natural spaces at least twice a week had twenty-three percent lower rates of depression.

However, access is unequal. In the UK, residents of the most deprived areas are roughly twice as likely to live more than ten minutes from a park.`,
    questions: [
      {
        id: 49,
        q: 'What does Kaplan\'s attention restoration theory say natural environments help with?',
        options: ['Physical exhaustion', 'Mental fatigue from sustained directed attention', 'Sleep deprivation', 'Screen-related eye strain'],
        answer: 1,
        explanation: 'The lecturer describes Kaplan\'s theory as recovery from "mental fatigue caused by sustained directed attention".',
      },
      {
        id: 50,
        q: 'What did the 2019 UK study find about people who use natural spaces twice a week?',
        options: ['10% lower anxiety', '23% lower rates of depression', '30% lower cardiovascular risk', '16% better concentration'],
        answer: 1,
        explanation: 'The lecturer states the study found "twenty-three percent lower rates of depression".',
      },
      {
        id: 51,
        q: 'What does the lecturer say about deprived areas and green space?',
        options: ['Access is improving rapidly', 'Residents are twice as likely to live far from a park', 'Only rural areas are affected', 'Deprived areas have more community gardens'],
        answer: 1,
        explanation: 'The lecturer states "residents of the most deprived areas are roughly twice as likely to live more than ten minutes from a park".',
      },
      {
        id: 52,
        q: 'How many participants were in the 2019 UK study?',
        options: ['Over 9,000', 'Over 19,000', 'Over 90,000', 'Over 900,000'],
        answer: 2,
        explanation: 'The lecturer says the study tracked "over ninety thousand participants".',
      },
    ],
    tags: ['section-4', 'academic-lecture', 'environment', 'public-health'],
  },

  {
    id: 14,
    section: 4,
    title: 'Talk on the history of radio',
    audioScript: `The story of radio begins with Scottish physicist James Clerk Maxwell, who in 1865 mathematically demonstrated that electromagnetic waves could travel through space at the speed of light. His contribution was entirely theoretical — he never built a transmitter.

It was Heinrich Hertz who experimentally confirmed Maxwell's predictions in 1887. The unit of frequency, the hertz, is named after him.

Guglielmo Marconi is credited with developing practical radio communication. In 1901 he claimed to transmit a signal across the Atlantic, though this remains contested by historians due to insufficient documentation.

In the UK, the BBC began its first regular broadcasting service in November 1922.`,
    questions: [
      {
        id: 53,
        q: 'What was Maxwell\'s contribution to radio?',
        options: ['He built the first transmitter', 'He transmitted the first transatlantic signal', 'He mathematically demonstrated electromagnetic waves could travel through space', 'He founded the first radio station'],
        answer: 2,
        explanation: 'The lecturer says Maxwell "mathematically demonstrated that electromagnetic waves could travel through space". His contribution was theoretical.',
      },
      {
        id: 54,
        q: 'Who experimentally confirmed Maxwell\'s predictions?',
        options: ['Marconi', 'Maxwell himself', 'Heinrich Hertz', 'The BBC'],
        answer: 2,
        explanation: 'The lecturer says "It was Heinrich Hertz who experimentally confirmed Maxwell\'s predictions in 1887".',
      },
      {
        id: 55,
        q: 'Why is Marconi\'s 1901 transatlantic claim controversial?',
        options: ['Hertz had already done it', 'Insufficient documentation', 'The signal was never verified', 'Maxwell\'s family disputed it'],
        answer: 1,
        explanation: 'The lecturer says the claim "remains contested by historians due to insufficient documentation".',
      },
      {
        id: 56,
        q: 'When did the BBC begin its first regular broadcasting service?',
        options: ['1901', 'November 1912', 'November 1922', '1927'],
        answer: 2,
        explanation: 'The lecturer states "the BBC began its first regular broadcasting service in November 1922".',
      },
    ],
    tags: ['section-4', 'academic-lecture', 'history', 'technology'],
  },

  {
    id: 15,
    section: 4,
    title: 'Lecture on sleep science',
    audioScript: `Sleep is an extraordinarily active neurological process — far from the passive downtime it was once considered to be.

A typical healthy adult cycles through non-REM and REM sleep stages approximately four to five times per night, with each cycle lasting roughly ninety minutes. During the deepest stage of non-REM sleep, the glymphatic system flushes metabolic waste products from the brain — including amyloid proteins associated with Alzheimer's disease.

Regarding memory, sleep plays an active role in consolidation. Subjects tested on new material after a night of sleep significantly outperform those tested after wakefulness. This effect is strongest for procedural memory — the memory of how to perform skills.`,
    questions: [
      {
        id: 57,
        q: 'How long does a typical sleep cycle last?',
        options: ['About 60 minutes', 'About 90 minutes', 'About 2 hours', 'About 3 hours'],
        answer: 1,
        explanation: 'The lecturer states "each cycle lasting roughly ninety minutes".',
      },
      {
        id: 58,
        q: 'What does the glymphatic system do during sleep?',
        options: ['Regulates temperature', 'Flushes metabolic waste from the brain', 'Strengthens memories', 'Produces waking hormones'],
        answer: 1,
        explanation: 'The lecturer explains the glymphatic system "flushes metabolic waste products from the brain".',
      },
      {
        id: 59,
        q: 'For which type of memory is the sleep consolidation effect strongest?',
        options: ['Semantic memory', 'Episodic memory', 'Procedural memory', 'Spatial memory'],
        answer: 2,
        explanation: 'The lecturer says "This effect is strongest for procedural memory — the memory of how to perform skills".',
      },
      {
        id: 60,
        q: 'How was sleep previously regarded before modern research?',
        options: ['As essential as food', 'As a passive downtime state', 'As a period of high brain activity', 'As controlled by the glymphatic system'],
        answer: 1,
        explanation: 'The lecturer says sleep was once considered "passive downtime" before modern research showed otherwise.',
      },
    ],
    tags: ['section-4', 'academic-lecture', 'science', 'health'],
  },
]
