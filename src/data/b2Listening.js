export const B2_LISTENING_TASKS = [
  // ─── SECTION 1 ───────────────────────────────────────────────────────────────

  {
    id: 1,
    section: 1,
    title: 'Phone enquiry about a gym membership',
    audioScript: `A: Good morning, FitLife Gym, how can I help you?
B: Hi, yeah, I'm calling to ask about joining. I was looking at your website but I couldn't find all the details I needed.
A: Of course, happy to help. So we've got three main membership options. There's a basic monthly plan at thirty-two pounds, a standard plan at forty-five pounds, and a premium plan at sixty pounds a month.
B: What's the difference between standard and premium?
A: Standard gives you full access to the gym floor, the pool, and all group classes. Premium adds personal training sessions — you get two a month included.
B: Oh right, that's good. What about parking? I'd be driving in most days.
A: We do have a car park, but it's only free for premium members. Standard and basic members pay one pound fifty per visit.
B: That's a shame. And when does the gym open? I'd probably come early before work.
A: We open at six in the morning Monday to Friday, and seven on weekends.
B: Perfect. And is there a joining fee on top?
A: Yes, there's a one-off joining fee of twenty pounds, regardless of which plan you choose.
B: Okay, great. I think I'll go with the standard plan then. Can I sign up online?
A: You can, yes. Just head to our website and click 'Join Now'. It takes about five minutes.`,
    questions: [
      {
        id: 1,
        q: 'How much does the standard membership cost per month?',
        options: ['£32', '£45', '£60', '£75'],
        answer: 1,
        explanation: 'The receptionist clearly states "a standard plan at forty-five pounds", making £45 the correct answer.',
      },
      {
        id: 2,
        q: 'What extra benefit do premium members receive compared to standard members?',
        options: ['Free parking', 'Access to the pool', 'Two personal training sessions per month', 'Unlimited group classes'],
        answer: 2,
        explanation: 'The receptionist says "Premium adds personal training sessions — you get two a month included", distinguishing it from standard.',
      },
      {
        id: 3,
        q: 'What time does the gym open on weekdays?',
        options: ['5:00 am', '6:00 am', '7:00 am', '8:00 am'],
        answer: 1,
        explanation: 'The receptionist states "We open at six in the morning Monday to Friday", so the weekday opening time is 6 am.',
      },
      {
        id: 4,
        q: 'Which membership plan does the caller decide to take?',
        options: ['Basic', 'Standard', 'Premium', 'She does not decide'],
        answer: 1,
        explanation: 'At the end of the conversation the caller says "I think I\'ll go with the standard plan", confirming her choice.',
      },
    ],
    tags: ['section-1', 'phone-call', 'gym', 'daily-life'],
  },

  {
    id: 2,
    section: 1,
    title: 'Flat rental enquiry',
    audioScript: `A: Hello, Oakfield Properties, this is Marcus speaking.
B: Hi Marcus, I saw a listing for a two-bedroom flat on Grove Street — is it still available?
A: It is, yes. It came back on the market just last week actually.
B: Great. Can you tell me a bit more about it? The listing didn't have much detail.
A: Sure. It's on the third floor, no lift unfortunately. It's fully furnished, two double bedrooms, one bathroom, and there's a small balcony off the living room.
B: That sounds good. What's the monthly rent?
A: It's eleven hundred and fifty pounds a month, which includes water rates. Gas and electricity are separate.
B: And is there parking?
A: There's one allocated space in the car park at the back of the building, yes.
B: Brilliant. What about pets? I have a cat.
A: The landlord is fine with cats, but not dogs. So that's no problem for you.
B: Perfect. Is it close to public transport?
A: Very close — there's a bus stop right outside and Finchley Road tube station is about a seven-minute walk.
B: That works well for me. Can I arrange a viewing?
A: Of course. When are you available? We could do Thursday afternoon or Saturday morning.
B: Saturday morning would suit me better actually.
A: Great, I'll book that in. Can I take your name?`,
    questions: [
      {
        id: 5,
        q: 'What is included in the monthly rent of £1,150?',
        options: ['Gas and electricity', 'Water rates', 'Council tax', 'Internet'],
        answer: 1,
        explanation: 'Marcus says "eleven hundred and fifty pounds a month, which includes water rates", so water is the included utility.',
      },
      {
        id: 6,
        q: 'What is the landlord\'s policy on pets?',
        options: ['No pets allowed at all', 'Cats and dogs are both welcome', 'Cats are allowed but not dogs', 'Dogs are allowed but not cats'],
        answer: 2,
        explanation: 'Marcus explicitly states "The landlord is fine with cats, but not dogs", so cats are permitted.',
      },
      {
        id: 7,
        q: 'How far is the nearest tube station from the flat?',
        options: ['Two minutes', 'Five minutes', 'Seven minutes', 'Ten minutes'],
        answer: 2,
        explanation: 'Marcus says "Finchley Road tube station is about a seven-minute walk", making seven minutes the correct answer.',
      },
      {
        id: 8,
        q: 'When does the caller arrange to view the flat?',
        options: ['Thursday morning', 'Thursday afternoon', 'Saturday morning', 'Saturday afternoon'],
        answer: 2,
        explanation: 'The caller says "Saturday morning would suit me better", choosing Saturday morning over Thursday afternoon.',
      },
    ],
    tags: ['section-1', 'flat-rental', 'phone-call', 'housing'],
  },

  {
    id: 3,
    section: 1,
    title: 'Booking a restaurant',
    audioScript: `A: Good evening, The Olive Branch, how can I help?
B: Hi, I'd like to make a reservation for this Saturday evening if possible.
A: Certainly. How many people will be dining?
B: There'll be six of us.
A: And what time were you thinking?
B: We were hoping for around eight o'clock, but we're flexible if that's not available.
A: Let me check... we do have eight o'clock available, yes. Can I take a name for the booking?
B: It's under Patterson — P-A-T-T-E-R-S-O-N.
A: Perfect. And a contact number in case we need to reach you?
B: Yes, it's 07742 331 089.
A: Thank you. I should mention that we do ask for a deposit for groups of six or more — it's fifteen pounds per person.
B: Oh, I wasn't aware of that. So that's ninety pounds total?
A: That's right. You can pay it online through our website, or over the phone now by card if you prefer.
B: I'll do it online. Also, one of our group has a nut allergy — is that something the kitchen can accommodate?
A: Absolutely, we deal with allergies all the time. Just remind the server when you arrive and they'll flag it with the kitchen.
B: Great, thanks. Oh, and is there parking nearby?
A: There's a pay-and-display car park on Market Street, about two minutes' walk from us. It's free after six in the evening.
B: That's really helpful. See you Saturday.`,
    questions: [
      {
        id: 9,
        q: 'What time is the reservation made for?',
        options: ['Seven o\'clock', 'Seven-thirty', 'Eight o\'clock', 'Eight-thirty'],
        answer: 2,
        explanation: 'The caller asks for eight o\'clock and the restaurant confirms "we do have eight o\'clock available, yes".',
      },
      {
        id: 10,
        q: 'How much is the total deposit required for the booking?',
        options: ['£15', '£60', '£90', '£100'],
        answer: 2,
        explanation: 'The deposit is £15 per person for a group of six, making £90 in total as the caller correctly calculates.',
      },
      {
        id: 11,
        q: 'How does the caller choose to pay the deposit?',
        options: ['By card over the phone', 'Online through the website', 'In person at the restaurant', 'By bank transfer'],
        answer: 1,
        explanation: 'After being given the options, the caller says "I\'ll do it online", choosing to pay via the website.',
      },
      {
        id: 12,
        q: 'What is the parking situation near the restaurant?',
        options: ['Free parking all day nearby', 'No parking available', 'Pay-and-display free after 6pm, two minutes away', 'A car park only open at weekends'],
        answer: 3,
        explanation: 'The host describes a pay-and-display on Market Street, two minutes away, that is free after six in the evening.',
      },
    ],
    tags: ['section-1', 'restaurant', 'booking', 'phone-call'],
  },

  {
    id: 4,
    section: 1,
    title: 'Reporting a lost item',
    audioScript: `A: Westfield Shopping Centre security desk, how can I help?
B: Hi, I think I've left my bag somewhere in the shopping centre. I'm hoping someone might have handed it in.
A: I'm sorry to hear that. Let me check our lost property log. Can you describe the bag for me?
B: It's a medium-sized navy blue tote bag — canvas material. It has a green zip and there's a small keyring with a red ladybird on the outside.
A: And what was inside it, roughly?
B: A purse — black leather with a gold clasp — my phone charger, and a library book. The book is called 'The Thursday Murder Club' if that helps.
A: That's very helpful. And do you remember where you last had it?
B: I'm pretty sure I had it in the food court on the upper level. I went for lunch around half twelve and I think I left it on the seat when I got up.
A: Okay. We have had a few items handed in today. Let me just... yes, actually, I think we may have your bag. There's a navy tote with a ladybird keyring here.
B: Oh that's brilliant! Can I come and collect it?
A: Of course. We're on the ground floor, near the main entrance — just look for the blue 'Information' sign. We close at six, so please come before then.
B: I'm on my way now, thank you so much.
A: No problem. Can I take your name so I can put it aside for you?
B: Yes, it's Claire Donovan.`,
    questions: [
      {
        id: 13,
        q: 'What colour is the zip on the lost bag?',
        options: ['Navy blue', 'Black', 'Green', 'Red'],
        answer: 2,
        explanation: 'The caller describes "a navy blue tote bag... It has a green zip", so the zip colour is green.',
      },
      {
        id: 14,
        q: 'Where does the caller think she left the bag?',
        options: ['In a changing room', 'In the food court on the upper level', 'Near the main entrance', 'In a shop on the ground floor'],
        answer: 1,
        explanation: 'She says "I\'m pretty sure I had it in the food court on the upper level", identifying where she believes she lost it.',
      },
      {
        id: 15,
        q: 'What item inside the bag does the caller mention that could help identify it?',
        options: ['A library card', 'A black purse with a gold clasp', 'A laptop', 'A set of keys'],
        answer: 1,
        explanation: 'Among the contents, she mentions "A purse — black leather with a gold clasp", a distinctive item that helps identify the bag.',
      },
      {
        id: 16,
        q: 'Where should the caller go to collect the bag?',
        options: ['The upper floor food court', 'The security office on the second floor', 'The ground floor near the main entrance', 'Customer services on level three'],
        answer: 2,
        explanation: 'The security officer says "We\'re on the ground floor, near the main entrance — just look for the blue Information sign".',
      },
    ],
    tags: ['section-1', 'lost-property', 'phone-call', 'daily-life'],
  },

  // ─── SECTION 2 ───────────────────────────────────────────────────────────────

  {
    id: 5,
    section: 2,
    title: 'Community centre facilities tour',
    audioScript: `Welcome, everyone, and thanks for coming along to this introductory tour of the Riverside Community Centre. I'm Sandra, the centre manager, and I'll be showing you around this morning.

So, we opened this building just eighteen months ago after a major redevelopment of the old site. The council invested nearly two million pounds to create a truly multi-purpose space for local residents.

If you look to your left, you'll see our main sports hall. It can be divided into three separate courts for badminton or basketball. Bookings for the hall open six weeks in advance — I'd recommend booking early as it fills up fast, particularly on weekends.

Next we have the fitness suite, which is open from six in the morning until ten at night, seven days a week. Membership is just twenty-eight pounds a month, with a discounted rate of eighteen pounds for over-sixties and under-eighteens.

Moving through here, this is our learning hub. We run over thirty different classes here each week — everything from digital skills to pottery. Most classes are free or very low cost thanks to council funding.

Upstairs, there's a café serving hot food until three in the afternoon, and snacks and drinks until closing time. There's also a meeting room that community groups can hire for free — you just need to give us at least forty-eight hours' notice.

Finally, I want to mention our new community garden out the back. It was designed and built entirely by volunteers, and it won a regional award last year. If you'd like to get involved with maintaining it, we'd love to hear from you after the tour.`,
    questions: [
      {
        id: 17,
        q: 'How far in advance can bookings for the sports hall be made?',
        options: ['Two weeks', 'Four weeks', 'Six weeks', 'Eight weeks'],
        answer: 2,
        explanation: 'Sandra specifically states "Bookings for the hall open six weeks in advance", so six weeks is correct.',
      },
      {
        id: 18,
        q: 'What is the discounted monthly fitness suite membership rate for over-sixties?',
        options: ['£18', '£22', '£25', '£28'],
        answer: 0,
        explanation: 'Sandra says "a discounted rate of eighteen pounds for over-sixties and under-eighteens", so £18 is the discounted rate.',
      },
      {
        id: 19,
        q: 'Until what time does the café serve hot food?',
        options: ['12 noon', '1pm', '3pm', '5pm'],
        answer: 2,
        explanation: 'Sandra says the café serves "hot food until three in the afternoon", making 3pm the correct answer.',
      },
      {
        id: 20,
        q: 'What do community groups need to do to hire the meeting room?',
        options: ['Pay a small fee', 'Become members of the centre', 'Give at least 48 hours\' notice', 'Apply in writing one week in advance'],
        answer: 2,
        explanation: 'Sandra explains "community groups can hire for free — you just need to give us at least forty-eight hours\' notice".',
      },
    ],
    tags: ['section-2', 'community-centre', 'tour', 'monologue'],
  },

  {
    id: 6,
    section: 2,
    title: 'Local council recycling announcement',
    audioScript: `Good morning. This is an important message from Greenfield Borough Council about changes to your household recycling collections, which will take effect from the first of next month.

We're making these changes to help the council meet its new recycling targets and to bring our service in line with national guidelines. We appreciate your patience as we make this transition.

Firstly, glass bottles and jars will no longer be collected from your doorstep. Instead, we're installing new glass collection points throughout the borough. The nearest one to most residents will be at their local supermarket car park. This change is necessary because glass damages sorting machinery at the recycling facility.

Secondly, we're introducing a new food waste collection. You'll receive a small brown caddy for your kitchen and a larger brown bin for outside. Food waste should go in the kitchen caddy, which you then empty into the outdoor bin on collection day. Food waste will be collected every week, on the same day as your general rubbish.

Thirdly, your blue recycling bin will now accept a wider range of plastics. Previously only bottles and containers were accepted. From next month, you can also add plastic film and carrier bags, as long as they're clean and dry.

Your collection days are not changing, and there's no additional charge for any of these services. For more information, including a full list of glass collection points, please visit our website or call our helpline on 0800 472 1100. Thank you for doing your part for the environment.`,
    questions: [
      {
        id: 21,
        q: 'Why will glass no longer be collected from the doorstep?',
        options: ['It is too heavy for collection staff', 'Glass damages sorting machinery at the recycling facility', 'The council cannot afford to collect it', 'Glass must be sorted by residents first'],
        answer: 1,
        explanation: 'The announcement states "This change is necessary because glass damages sorting machinery at the recycling facility".',
      },
      {
        id: 22,
        q: 'How often will food waste be collected?',
        options: ['Every two weeks', 'Twice a week', 'Every week', 'Once a month'],
        answer: 2,
        explanation: 'The announcement clearly states "Food waste will be collected every week, on the same day as your general rubbish".',
      },
      {
        id: 23,
        q: 'What new items can now be placed in the blue recycling bin?',
        options: ['Glass jars and bottles', 'Food waste and vegetable peelings', 'Plastic film and carrier bags', 'Cardboard and newspapers'],
        answer: 2,
        explanation: 'The announcement says "you can also add plastic film and carrier bags, as long as they\'re clean and dry", expanding what the blue bin accepts.',
      },
      {
        id: 24,
        q: 'What is NOT changing as a result of these updates?',
        options: ['The types of plastic accepted', 'The way glass is collected', 'Collection days', 'Food waste arrangements'],
        answer: 2,
        explanation: 'The announcement explicitly reassures residents that "Your collection days are not changing", unlike all other elements which are being updated.',
      },
    ],
    tags: ['section-2', 'recycling', 'council', 'monologue', 'announcement'],
  },

  {
    id: 7,
    section: 2,
    title: 'Museum audio guide introduction',
    audioScript: `Welcome to the Hartfield Museum of Local History. I'm your audio guide for the permanent collection, 'The Story of Our Town'. This tour lasts approximately forty-five minutes, though you're free to spend as long as you like in any individual gallery.

The museum is arranged across two floors. You're currently on the ground floor, which covers the period from prehistoric times through to the Industrial Revolution. The upper floor takes the story from the Victorian era to the present day.

Let's begin. The first gallery to your right is called Origins. Here you'll find archaeological finds from the local area dating back over four thousand years, including a beautifully preserved bronze age burial urn that was discovered during construction work in 1987.

Moving further into the building, the medieval gallery contains a fascinating collection of documents, including a copy of the town's original market charter from 1342. The original is kept in a climate-controlled vault, but the reproduction on display is an exact replica.

One highlight not to miss is the Victorian Kitchen in gallery six. It's a fully reconstructed room from an 1880s worker's cottage, with authentic furniture and equipment. Children particularly enjoy the interactive display where you can try using some of the original kitchen tools.

Before you leave, please visit the museum shop on the ground floor near the exit. All purchases help fund our community outreach programmes. We also ask that you refrain from eating or drinking anywhere except the café, which is located upstairs next to gallery nine.

Enjoy your visit, and don't hesitate to ask a member of staff if you have any questions.`,
    questions: [
      {
        id: 25,
        q: 'How long does the audio guide tour last?',
        options: ['About 30 minutes', 'About 45 minutes', 'About an hour', 'About 90 minutes'],
        answer: 1,
        explanation: 'The guide states "This tour lasts approximately forty-five minutes", so 45 minutes is correct.',
      },
      {
        id: 26,
        q: 'When was the bronze age burial urn discovered?',
        options: ['During an archaeological dig in 1342', 'During construction work in 1987', 'During renovation of the museum in 2005', 'During a school excavation project'],
        answer: 1,
        explanation: 'The guide says the urn "was discovered during construction work in 1987", making 1987 the correct answer.',
      },
      {
        id: 27,
        q: 'What is special about the Victorian Kitchen in gallery six?',
        options: ['It contains original Victorian paintings', 'It is a fully reconstructed room with authentic furniture', 'It shows a wealthy Victorian family\'s home', 'It is the oldest exhibit in the museum'],
        answer: 1,
        explanation: 'The guide describes it as "a fully reconstructed room from an 1880s worker\'s cottage, with authentic furniture and equipment".',
      },
      {
        id: 28,
        q: 'Where is the café located?',
        options: ['On the ground floor near the exit', 'In the basement', 'Upstairs next to gallery nine', 'Outside in the courtyard'],
        answer: 2,
        explanation: 'The guide specifies "the café, which is located upstairs next to gallery nine", on the upper floor.',
      },
    ],
    tags: ['section-2', 'museum', 'audio-guide', 'monologue'],
  },

  {
    id: 8,
    section: 2,
    title: 'New employee job induction',
    audioScript: `Good morning everyone, and welcome to your first day here at Meridian Healthcare. I'm going to give you a quick overview of some important things you need to know before you head off to your individual departments.

First, your ID badges. You've all been given a temporary badge today, but your permanent photo ID will be ready by the end of the week. These badges are essential — you'll need them to access all areas of the building, including the car park, so please don't leave them at home.

Next, a word about timekeeping. We operate a flexible working system for most office-based roles, which means your core hours are ten in the morning until three in the afternoon. Outside those hours, you can start and finish flexibly, as long as you complete your contracted thirty-seven hours over the week. Any overtime beyond that must be approved by your line manager in advance.

Your line manager will take you through your department's specific induction this afternoon, but I want to cover our IT policy now. You must never use a personal email account for work communications — this includes external platforms like Gmail or Hotmail. All communication must go through your Meridian account. Breaching this policy is treated as a serious disciplinary matter.

Regarding the canteen: it's on the lower ground floor and it's subsidised, so meals are significantly cheaper than you'd pay outside. Hot food is served until two-thirty. After that, the servery is cold snacks and drinks only.

Finally, if you need to report a problem with anything — equipment, the building, IT issues — you should log it using our internal portal, not by emailing a specific person. That way it gets assigned to the right team automatically.

Any questions about anything I've covered, please come and find me. I hope you have a really positive first day.`,
    questions: [
      {
        id: 29,
        q: 'What are the core hours that all office-based employees must be present?',
        options: ['9am to 5pm', '8am to 4pm', '10am to 3pm', '9am to 3pm'],
        answer: 2,
        explanation: 'The induction speaker states "your core hours are ten in the morning until three in the afternoon", so 10am to 3pm is correct.',
      },
      {
        id: 30,
        q: 'What does the IT policy say about personal email accounts?',
        options: ['They can be used for informal communication', 'They must never be used for work communications', 'They are permitted only for external clients', 'They are allowed as a backup if Meridian email fails'],
        answer: 1,
        explanation: 'The speaker is explicit: "You must never use a personal email account for work communications", treating it as a serious disciplinary matter.',
      },
      {
        id: 31,
        q: 'Until what time is hot food served in the canteen?',
        options: ['12 noon', '1:30pm', '2:30pm', '3:00pm'],
        answer: 2,
        explanation: 'The speaker says "Hot food is served until two-thirty", making 2:30pm the correct answer.',
      },
      {
        id: 32,
        q: 'How should employees report a problem with equipment or IT?',
        options: ['Email their line manager directly', 'Call the IT department', 'Log it on the internal portal', 'Fill in a paper form'],
        answer: 2,
        explanation: 'The speaker says "you should log it using our internal portal, not by emailing a specific person — that way it gets assigned to the right team automatically".',
      },
    ],
    tags: ['section-2', 'workplace', 'induction', 'monologue'],
  },

  // ─── SECTION 3 ───────────────────────────────────────────────────────────────

  {
    id: 9,
    section: 3,
    title: 'Two students discussing a research project',
    audioScript: `A: Hey Priya, have you started thinking about the methodology for our urban transport project?
B: A bit, yeah. I was thinking we should do a mixed-methods approach — some quantitative data from transport authority statistics and then qualitative interviews with commuters.
A: I like that. How many interviews were you thinking?
B: Dr. Chen suggested a minimum of fifteen to get meaningful patterns, but I think twenty would give us more to work with. What do you think?
A: Twenty sounds right to me. We'd need to think about where we recruit participants though. I was wondering about the main train station — lots of different commuter types there.
B: That's a good idea. We should probably also include a mix of ages. I don't want it to end up being all students.
A: Agreed. Should we create a questionnaire first and test it before we do the real interviews?
B: Definitely — pilot testing is really important. We don't want to get halfway through and realise our questions are leading or ambiguous.
A: Right. How are we going to divide the work? I was thinking I could handle the data collection from the transport authority — I already have a contact there from my placement last year.
B: Oh, that's really useful. In that case, I could take the lead on designing the interview guide and the ethics submission.
A: Perfect. The ethics form has to be in by the end of next week, doesn't it?
B: Yes, and Dr. Chen said if it's late, we can't start data collection until after the Easter break, which would be a disaster for our timeline.
A: Okay, so ethics submission is the priority. Let's aim to have a draft done by Wednesday so we can review it together.`,
    questions: [
      {
        id: 33,
        q: 'How many interviews do the students decide to aim for?',
        options: ['Ten', 'Fifteen', 'Twenty', 'Twenty-five'],
        answer: 2,
        explanation: 'Priya suggests twenty would give more to work with, and Student A agrees, saying "Twenty sounds right to me".',
      },
      {
        id: 34,
        q: 'Why do the students decide to pilot test the questionnaire?',
        options: ['Because their supervisor requires it', 'To avoid questions being leading or ambiguous', 'To check how long the interviews will take', 'To meet the ethics submission requirements'],
        answer: 1,
        explanation: 'Priya says "We don\'t want to get halfway through and realise our questions are leading or ambiguous", giving the reason for piloting.',
      },
      {
        id: 35,
        q: 'Who will take the lead on designing the interview guide?',
        options: ['Student A, because of their transport authority contact', 'Priya, since Student A is handling data collection', 'Both students will do it together', 'Dr. Chen will provide a template'],
        answer: 1,
        explanation: 'After Student A offers to handle data collection, Priya says "I could take the lead on designing the interview guide and the ethics submission".',
      },
      {
        id: 36,
        q: 'What will happen if the ethics form is submitted late?',
        options: ['They will receive a lower grade', 'They cannot start data collection until after the Easter break', 'They will need a new supervisor', 'Their project topic must change'],
        answer: 1,
        explanation: 'Priya warns that "if it\'s late, we can\'t start data collection until after the Easter break, which would be a disaster for our timeline".',
      },
    ],
    tags: ['section-3', 'students', 'research', 'academic'],
  },

  {
    id: 10,
    section: 3,
    title: 'Tutor feedback on an essay',
    audioScript: `A: Come in, Tom. Sit down. So, I've had a chance to read through your essay on the causes of the First World War — shall we go through my feedback?
B: Yes please. I was a bit nervous about it, to be honest. I felt like I ran out of time towards the end.
A: I think that shows, yes. The structure in the first half is actually really strong — your introduction clearly outlines your argument and you make excellent use of primary sources in the second and third sections. Those parts were genuinely impressive.
B: Thanks. I wasn't sure if I was referencing correctly.
A: The referencing is fine. Your bibliography is properly formatted and the in-text citations are consistent. That's not the issue. The problem is the conclusion. It's only four sentences long and it doesn't actually address your thesis statement at all. You seem to have just summarised the sections rather than drawing them together into a response to your argument.
B: Yeah, I knew that wasn't right. I literally ran out of time.
A: Okay, so for next time, I'd strongly recommend planning your conclusion before you start writing, not after. That way you always know where you're heading.
B: That's a good tip. Is there anything else I should work on?
A: Your critical analysis in the middle section is good, but you rely a bit too heavily on one historian — A.J.P. Taylor. You need to engage with a wider range of perspectives. Counterarguments make your essay much stronger if you can acknowledge and then rebut them.
B: I'll look at some more secondary sources. Should I resubmit this one?
A: If you want to, you can revise the conclusion and resubmit by the end of term for a revised mark. It's entirely up to you.`,
    questions: [
      {
        id: 37,
        q: 'What does the tutor say is the main problem with the essay?',
        options: ['The introduction is unclear', 'The referencing style is incorrect', 'The conclusion does not address the thesis statement', 'There are not enough primary sources'],
        answer: 2,
        explanation: 'The tutor says "The problem is the conclusion... it doesn\'t actually address your thesis statement at all", identifying the conclusion as the main weakness.',
      },
      {
        id: 38,
        q: 'What does the tutor say is strong about the essay?',
        options: ['The conclusion and bibliography', 'The introduction and use of primary sources', 'The counterarguments presented', 'The range of historians cited'],
        answer: 1,
        explanation: 'The tutor praises "your introduction clearly outlines your argument and you make excellent use of primary sources in the second and third sections".',
      },
      {
        id: 39,
        q: 'What advice does the tutor give about planning?',
        options: ['Write the introduction last', 'Create a detailed bibliography before writing', 'Plan the conclusion before starting to write', 'Draft the middle sections first'],
        answer: 2,
        explanation: 'The tutor advises "plan your conclusion before you start writing, not after. That way you always know where you\'re heading".',
      },
      {
        id: 40,
        q: 'What criticism does the tutor make about Tom\'s use of sources?',
        options: ['He uses too many primary sources', 'He does not cite sources correctly', 'He relies too heavily on one historian', 'He has not used enough internet sources'],
        answer: 2,
        explanation: 'The tutor says "you rely a bit too heavily on one historian — A.J.P. Taylor. You need to engage with a wider range of perspectives".',
      },
    ],
    tags: ['section-3', 'tutor', 'essay-feedback', 'academic'],
  },

  {
    id: 11,
    section: 3,
    title: 'Group project planning meeting',
    audioScript: `A: Right, so we've got three weeks until the presentation. Let's work out who's doing what.
B: Before we do that, can we agree on the structure? I think we should have an introduction, three main content sections, and a conclusion. That gives each of us roughly one section.
C: That makes sense to me. I'm happy to do the introduction — I find it easier to set the scene if I've already heard what everyone else is covering.
A: That's a bit awkward though, isn't it? Usually the introduction is prepared first so the rest of the presentation flows from it.
C: Fair point. In that case, why don't we all just draft our sections independently and then I'll write the introduction last, once I can see how everything connects?
B: Yeah, that works. Okay, so for the content — I was thinking about tackling the economic impacts, since that relates to my dissertation topic.
A: That's fine with me. I'd prefer to cover the social impacts — there's a lot of recent literature on that and I've already started reading around it.
C: Which leaves me with environmental impacts. I don't know that area as well, but I'll do some background reading this week.
A: We should also think about the visual side. Are we doing slides?
B: Definitely. I think we should use a consistent template — nothing too flashy. Just clean, readable slides. Each of us can make our own section's slides but we need to agree on a colour scheme first.
C: Can we just use the university branding? It saves arguments.
A: Good idea. Let's do that. When should we reconvene to check in on progress?
B: How about two weeks from today — that gives us a week to prepare slides after the draft content is done.
A: Works for me.`,
    questions: [
      {
        id: 41,
        q: 'How do the students finally agree to handle the introduction?',
        options: ['Speaker A will write it first', 'Speaker C will write it last, after seeing all sections', 'They will write it together at the meeting', 'Speaker B will write it based on the economic section'],
        answer: 1,
        explanation: 'Speaker C proposes "I\'ll write the introduction last, once I can see how everything connects", and the group agrees to this approach.',
      },
      {
        id: 42,
        q: 'Why does Speaker B choose the economic impacts section?',
        options: ['It is the easiest topic', 'It relates to their dissertation topic', 'No one else wanted it', 'The tutor assigned it to them'],
        answer: 1,
        explanation: 'Speaker B says "I was thinking about tackling the economic impacts, since that relates to my dissertation topic", giving their reason.',
      },
      {
        id: 43,
        q: 'What do they agree to use for their presentation slides?',
        options: ['A template designed by Speaker B', 'A flashy animated design', 'The university branding', 'Each person chooses their own style'],
        answer: 2,
        explanation: 'Speaker C suggests "Can we just use the university branding? It saves arguments" and Speaker A agrees, saying "Good idea".',
      },
      {
        id: 44,
        q: 'When do the students agree to meet again to check progress?',
        options: ['In one week', 'In two weeks', 'In three weeks', 'The day before the presentation'],
        answer: 1,
        explanation: 'Speaker B proposes "How about two weeks from today", and Speaker A confirms this works, so two weeks is the agreed timeframe.',
      },
    ],
    tags: ['section-3', 'group-project', 'planning', 'academic'],
  },

  {
    id: 12,
    section: 3,
    title: 'Preparing for a seminar',
    audioScript: `A: Have you done the reading for Thursday's seminar yet? It's about framing effects in media coverage.
B: Only the first article. The second one was really long and I got a bit lost with the theoretical framework.
A: Same — I think the key point is that the way a news story is framed affects how audiences interpret events, even if the underlying facts are identical. The classic experiment they mention is the disease problem — two groups get the same statistics presented differently and make completely opposite choices.
B: Right, I did understand that bit. It's basically saying our decisions are irrational and depend on context.
A: Exactly. I think Dr. Okafor will probably ask us to apply it to a real example. We should think of a few before Thursday.
B: Good call. I was thinking maybe Brexit coverage? Different newspapers framed the same events really differently.
A: That's a good one. Or vaccine hesitancy — the way statistics about risk are framed massively affected public response during the pandemic.
B: Oh, that's actually more directly linked to the reading since they talk about health communication specifically.
A: True. Let's both prepare something on that, so if one of us gets called on we can back each other up.
B: Sounds good. Did you see Dr. Okafor posted a list of discussion questions on the portal?
A: No, I missed that. What are they?
B: There are five. The one I found hardest was about whether framing effects diminish with media literacy — I'm genuinely not sure what I think.
A: That's a really interesting one actually. I think the evidence suggests it reduces but doesn't eliminate it. We should find a citation to support that if we can.`,
    questions: [
      {
        id: 45,
        q: 'What is the main concept the students are discussing from the reading?',
        options: ['How journalists choose which stories to cover', 'How the way a story is framed affects audience interpretation', 'Whether audiences trust online news more than print', 'The relationship between social media and news consumption'],
        answer: 1,
        explanation: 'Student A summarises: "the way a news story is framed affects how audiences interpret events, even if the underlying facts are identical" — this is framing effects.',
      },
      {
        id: 46,
        q: 'Which real-world example do the students decide to focus on for the seminar?',
        options: ['Brexit newspaper coverage', 'Social media misinformation', 'Vaccine hesitancy and health communication', 'Climate change reporting'],
        answer: 2,
        explanation: 'Student B points out vaccine hesitancy is "more directly linked to the reading since they talk about health communication specifically", so both agree to prepare on that topic.',
      },
      {
        id: 47,
        q: 'Where did Dr. Okafor post the discussion questions?',
        options: ['By email to all students', 'On the seminar portal', 'In the printed reading pack', 'On the department noticeboard'],
        answer: 1,
        explanation: 'Student B says "Dr. Okafor posted a list of discussion questions on the portal", referring to an online course portal.',
      },
      {
        id: 48,
        q: 'What does Student A think about the effect of media literacy on framing effects?',
        options: ['Media literacy eliminates framing effects entirely', 'Media literacy has no effect on framing', 'Framing effects reduce but do not disappear with media literacy', 'Only experts are unaffected by framing'],
        answer: 2,
        explanation: 'Student A says "the evidence suggests it reduces but doesn\'t eliminate it", meaning framing effects diminish but persist even with media literacy.',
      },
    ],
    tags: ['section-3', 'seminar', 'media', 'academic'],
  },

  // ─── SECTION 4 ───────────────────────────────────────────────────────────────

  {
    id: 13,
    section: 4,
    title: 'Lecture on urban green spaces',
    audioScript: `Good afternoon. Today's lecture focuses on urban green spaces — parks, street trees, community gardens, and other natural features within cities — and their demonstrable effects on public health and social cohesion.

The relationship between urban nature and human wellbeing has been studied for well over a century, but the volume and rigour of research has accelerated substantially since the 1980s. One foundational concept is what psychologist Rachel Kaplan called 'attention restoration theory', which proposes that natural environments allow the brain to recover from the mental fatigue caused by sustained directed attention — the kind we use constantly in urban work environments. Studies using cognitive tests before and after exposure to green spaces consistently show measurable improvements in concentration and working memory.

Beyond cognitive benefits, the epidemiological evidence linking proximity to green space with lower rates of cardiovascular disease, depression, and anxiety is now substantial. A landmark 2019 study tracking over ninety thousand participants in the UK found that those who reported using natural spaces at least twice a week had twenty-three percent lower rates of depression and sixteen percent lower rates of high blood pressure compared to those who did not.

However, access to green space is profoundly unequal. In the UK, residents of the most deprived areas are roughly twice as likely to live more than ten minutes from a publicly accessible park. This inequality means the health benefits of urban nature are disproportionately captured by wealthier populations.

Several cities are now implementing what planners call 'green infrastructure' strategies — treating parks, river corridors, and street trees as interconnected networks rather than isolated features. Melbourne's Urban Forest Strategy, adopted in 2012, aimed to increase canopy cover from nineteen to forty percent by 2040. Early evaluations suggest the programme is on track, with measurable reductions in the urban heat island effect and increases in biodiversity.

The challenge for urban planners is not merely to increase the quantity of green space, but to ensure equitable distribution and to design spaces that meet the diverse needs of all urban residents.`,
    questions: [
      {
        id: 49,
        q: 'According to Rachel Kaplan\'s attention restoration theory, what do natural environments help the brain to recover from?',
        options: ['Physical exhaustion from commuting', 'Mental fatigue caused by sustained directed attention', 'Sleep deprivation common in urban workers', 'The cognitive effects of digital screen use'],
        answer: 1,
        explanation: 'The lecturer describes Kaplan\'s theory as proposing that natural environments allow the brain to recover from "mental fatigue caused by sustained directed attention".',
      },
      {
        id: 50,
        q: 'What did the 2019 UK study of over 90,000 participants find about people who use natural spaces twice a week?',
        options: ['They had 10% lower rates of anxiety', 'They had 23% lower rates of depression', 'They had 30% lower rates of cardiovascular disease', 'They reported 16% better concentration scores'],
        answer: 1,
        explanation: 'The lecturer states the study found "twenty-three percent lower rates of depression" among those who used natural spaces at least twice a week.',
      },
      {
        id: 51,
        q: 'What does the lecturer say about access to green space in the UK\'s most deprived areas?',
        options: ['It is improving rapidly due to government investment', 'Residents are roughly twice as likely to live far from a park', 'The problem only affects rural areas, not cities', 'Deprived areas have more community gardens than wealthy areas'],
        answer: 1,
        explanation: 'The lecturer states "residents of the most deprived areas are roughly twice as likely to live more than ten minutes from a publicly accessible park".',
      },
      {
        id: 52,
        q: 'What was the target canopy cover set by Melbourne\'s Urban Forest Strategy?',
        options: ['25%', '30%', '35%', '40%'],
        answer: 3,
        explanation: 'The lecturer says Melbourne aimed "to increase canopy cover from nineteen to forty percent by 2040", so forty percent is the target.',
      },
    ],
    tags: ['section-4', 'academic-lecture', 'environment', 'public-health'],
  },

  {
    id: 14,
    section: 4,
    title: 'Talk on the history of radio',
    audioScript: `This afternoon I want to trace the development of radio from its theoretical origins in the nineteenth century through to the digital broadcasting revolution of the early twenty-first century — and to consider what this history tells us about how communication technologies shape society.

The story begins with Scottish physicist James Clerk Maxwell, who published his electromagnetic theory in 1865, mathematically demonstrating that electromagnetic waves could travel through space at the speed of light. Maxwell never built a radio transmitter — his contribution was entirely theoretical. It was the German physicist Heinrich Hertz who experimentally confirmed Maxwell's predictions in 1887, successfully generating and detecting radio waves in his laboratory. The unit of frequency, the hertz, is named in his honour.

The leap from laboratory demonstration to practical communication device is largely credited to the Italian inventor Guglielmo Marconi. In 1901, Marconi claimed to have transmitted a radio signal across the Atlantic Ocean, from Cornwall in England to Newfoundland in Canada. The claim was, and remains, contested by historians due to insufficient documentation, but Marconi's subsequent development of ship-to-ship and ship-to-shore communication was unambiguous and had enormous practical impact — particularly following the sinking of the Titanic in 1912, which demonstrated dramatically the life-saving potential of wireless communication.

Regular public broadcasting began in earnest in the early 1920s. In the United Kingdom, the BBC — originally the British Broadcasting Company — began its first regular service in November 1922. It became a corporation, the British Broadcasting Corporation, in 1927, funded by the licence fee model that persists to this day.

The transition to digital radio, or DAB as it is commonly known, began in the 1990s. DAB offers clearer sound quality and the ability to carry more channels, but the rollout has been slower than anticipated, partly due to the infrastructure cost and partly because of continued strong attachment to analogue FM broadcasting.`,
    questions: [
      {
        id: 53,
        q: 'What was James Clerk Maxwell\'s contribution to the development of radio?',
        options: ['He built the first radio transmitter', 'He transmitted the first transatlantic signal', 'He mathematically demonstrated that electromagnetic waves could travel through space', 'He founded the first public radio station'],
        answer: 2,
        explanation: 'The lecturer says Maxwell "published his electromagnetic theory in 1865, mathematically demonstrating that electromagnetic waves could travel through space at the speed of light". His contribution was theoretical, not practical.',
      },
      {
        id: 54,
        q: 'Why does the lecturer say Marconi\'s 1901 transatlantic claim is controversial?',
        options: ['Because Hertz had already done it before him', 'Due to insufficient documentation', 'Because the signal was never verified independently', 'Because Maxwell\'s family disputed it'],
        answer: 1,
        explanation: 'The lecturer says the claim "remains contested by historians due to insufficient documentation".',
      },
      {
        id: 55,
        q: 'When did the BBC begin its first regular broadcasting service?',
        options: ['In 1901', 'In November 1912', 'In November 1922', 'In 1927'],
        answer: 2,
        explanation: 'The lecturer states "the BBC... began its first regular service in November 1922", making November 1922 the correct answer.',
      },
      {
        id: 56,
        q: 'According to the lecturer, why has the rollout of DAB digital radio been slower than expected?',
        options: ['Because of poor sound quality in rural areas', 'Due to infrastructure costs and attachment to FM broadcasting', 'Because the government banned it until 2010', 'Due to public concerns about health and radio waves'],
        answer: 1,
        explanation: 'The lecturer cites two reasons: "partly due to the infrastructure cost and partly because of continued strong attachment to analogue FM broadcasting".',
      },
    ],
    tags: ['section-4', 'academic-lecture', 'history', 'technology', 'radio'],
  },

  {
    id: 15,
    section: 4,
    title: 'Lecture on sleep science',
    audioScript: `Welcome, everyone. In today's lecture I want to examine what sleep science has revealed about the function of sleep, the consequences of sleep deprivation, and — briefly — some of the emerging evidence around sleep and memory consolidation.

For most of human history, sleep was regarded as a passive state — a kind of biological downtime during which the brain simply waited for waking life to resume. We now know this view is profoundly mistaken. Sleep is an extraordinarily active neurological process, and far from being a luxury, it appears to be one of the most critical maintenance functions the brain performs.

Sleep architecture refers to the structure of a night's sleep, which cycles through distinct stages. We broadly distinguish between non-REM sleep, which itself has three stages of increasing depth, and REM sleep — rapid eye movement sleep — during which most vivid dreaming occurs. A typical healthy adult cycles through these stages approximately four to five times per night, with each cycle lasting roughly ninety minutes.

The restorative function of sleep operates across multiple systems simultaneously. During slow-wave sleep — the deepest stage of non-REM — the glymphatic system, a network of channels surrounding blood vessels in the brain, becomes dramatically more active. Cerebrospinal fluid is pumped through this system, flushing out metabolic waste products, including the amyloid proteins whose accumulation is associated with Alzheimer's disease.

Regarding memory, the evidence now strongly supports the consolidation hypothesis — the idea that sleep plays an active role in strengthening newly encoded memories. Studies show that subjects tested on newly learned material after a night of sleep significantly outperform those tested after an equivalent period of wakefulness. This effect appears to be strongest for procedural memory — the memory of how to perform skills — and for emotionally salient information.

The consequences of chronic sleep deprivation are now well documented and extend well beyond tiredness. Immune function deteriorates, cardiovascular risk increases, and cognitive performance — particularly on tasks requiring attention and working memory — declines sharply even after just one or two nights of restricted sleep.`,
    questions: [
      {
        id: 57,
        q: 'How long does a typical sleep cycle last in a healthy adult?',
        options: ['About 60 minutes', 'About 90 minutes', 'About 2 hours', 'About 3 hours'],
        answer: 1,
        explanation: 'The lecturer states "each cycle lasting roughly ninety minutes", so approximately 90 minutes is the correct answer.',
      },
      {
        id: 58,
        q: 'What is the function of the glymphatic system during sleep?',
        options: ['To regulate body temperature', 'To flush metabolic waste products from the brain', 'To strengthen newly learned memories', 'To produce the hormones needed for waking'],
        answer: 1,
        explanation: 'The lecturer explains that "Cerebrospinal fluid is pumped through this system, flushing out metabolic waste products", which is the glymphatic system\'s role.',
      },
      {
        id: 59,
        q: 'According to the memory consolidation hypothesis, for which type of memory is the sleep effect strongest?',
        options: ['Semantic memory — knowledge of facts', 'Episodic memory — recollection of personal events', 'Procedural memory — the memory of how to perform skills', 'Spatial memory — navigating environments'],
        answer: 2,
        explanation: 'The lecturer says "This effect appears to be strongest for procedural memory — the memory of how to perform skills — and for emotionally salient information".',
      },
      {
        id: 60,
        q: 'What does the lecturer say happens to immune function with chronic sleep deprivation?',
        options: ['It remains largely unaffected', 'It adapts and compensates over time', 'It deteriorates', 'It improves as the body becomes more alert'],
        answer: 2,
        explanation: 'The lecturer lists the consequences of chronic sleep deprivation: "Immune function deteriorates, cardiovascular risk increases..." — so immune function deteriorates.',
      },
    ],
    tags: ['section-4', 'academic-lecture', 'science', 'health', 'sleep'],
  },
]
