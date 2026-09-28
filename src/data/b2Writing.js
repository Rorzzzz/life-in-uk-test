// B2 English Writing — IELTS General Training prompts with model answers

export const B2_WRITING_TASKS = [
  // ================= TASK 1 — FORMAL LETTERS (1–5) =================
  {
    id: 1,
    task: 1,
    type: 'formal-letter',
    title: 'Complaint to a landlord about heating',
    prompt: `You rent a flat and the central heating has stopped working. Write a letter to your landlord.

In your letter:
- describe the problem
- explain how it is affecting you
- say what you would like the landlord to do`,
    keyPoints: [
      'Describe the heating problem clearly',
      'Explain the impact on daily life',
      'Make a specific request for action',
    ],
    modelAnswer: `Dear Mr Henderson,

I am writing to inform you of a serious problem with the central heating at my flat at 14 Maple Street, which I have rented since March.

For the past two weeks, the heating has not been working at all. Despite adjusting the thermostat on several occasions, the radiators remain completely cold. I contacted the property management office on 3rd November but have not received any response.

This situation is having a significant impact on my daily life. As temperatures have dropped considerably, the flat is now extremely cold, particularly in the evenings. I am particularly concerned as I have a young child at home.

I would be grateful if you could arrange for a qualified heating engineer to inspect the property as soon as possible. I am available any weekday between 9am and 5pm. If the problem is not resolved within five days, I may need to seek alternative accommodation temporarily.

I look forward to hearing from you promptly.

Yours sincerely,
A. Taylor`,
    examinerNotes: 'All three bullet points are addressed clearly and in order. Formal register is maintained throughout with appropriate vocabulary (inform, considerably, grateful). Specific details (address, date) add credibility. The closing condition is assertive without being aggressive.',
    wordCount: 177,
    difficulty: 'medium',
    tags: ['formal', 'complaint', 'accommodation'],
  },
  {
    id: 2,
    task: 1,
    type: 'formal-letter',
    title: 'Letter to council about a local park',
    prompt: `You are concerned about the condition of a park in your local area. Write a letter to the local council.

In your letter:
- describe the current condition of the park
- explain why the park is important to the community
- suggest what improvements could be made`,
    keyPoints: [
      'Describe specific problems with the park',
      'Explain the community value of the park',
      'Suggest concrete improvements',
    ],
    modelAnswer: `Dear Sir or Madam,

I am writing to express my concern about the deteriorating condition of Riverside Park, which has been a valued green space in our community for many years.

The park is currently in a poor state of repair. Several benches are broken, the children's play equipment has not been maintained and poses a safety risk, and the pathways are badly cracked and uneven. Litter is frequently left uncollected for days at a time.

Despite its current condition, Riverside Park remains extremely important to local residents. It provides the only safe outdoor space for children in this area, and many elderly residents rely on it for daily exercise. It also serves as a meeting point for community events throughout the year.

I would like to suggest several improvements: replacing the damaged benches and play equipment, resurfacing the main pathways, and arranging more frequent litter collections. A small community garden area, which several local groups have offered to maintain voluntarily, would also be a welcome addition.

I hope the council will consider these suggestions as a matter of priority.

Yours faithfully,
J. Morris`,
    examinerNotes: 'The three bullet points are fully developed with specific detail. Formal vocabulary (deteriorating, valued, poses a safety risk) is used accurately. The structure moves logically from problem to context to solution. "Yours faithfully" is correctly used when the recipient is unknown.',
    wordCount: 196,
    difficulty: 'medium',
    tags: ['formal', 'community', 'environment'],
  },
  {
    id: 3,
    task: 1,
    type: 'formal-letter',
    title: 'Request for flexible working',
    prompt: `You would like to change your working hours so that you can work from home two days a week. Write a letter to your manager.

In your letter:
- explain why you are requesting flexible working
- describe how you would manage your responsibilities
- say when you would like the arrangement to begin`,
    keyPoints: [
      'Give a clear reason for the request',
      'Explain how work responsibilities will be maintained',
      'Specify a start date',
    ],
    modelAnswer: `Dear Ms Patel,

I am writing to request a flexible working arrangement that would allow me to work from home on Mondays and Thursdays each week.

My reason for this request is primarily personal. My daughter recently started primary school, and the current drop-off time conflicts with my usual commute, causing me to arrive late on several occasions. Working from home on two days per week would resolve this issue without affecting my output.

I want to assure you that my responsibilities would be fully maintained under this arrangement. I would be contactable by phone and email during core hours, attend all team meetings via video call, and continue to meet all project deadlines. I would come into the office on the remaining three days as usual, including any days when client meetings are scheduled.

If approved, I would be grateful if the arrangement could begin from the first of next month, which would give the team sufficient time to adjust. I am happy to review the arrangement after three months to ensure it is working well for everyone.

Thank you for considering my request.

Yours sincerely,
D. Clarke`,
    examinerNotes: 'All three bullet points are addressed in separate, well-developed paragraphs. The tone is professional and considerate, anticipating the manager\'s concerns about productivity. The offer to review the arrangement shows flexibility. Word count and register are appropriate for a workplace formal letter.',
    wordCount: 201,
    difficulty: 'medium',
    tags: ['formal', 'work', 'flexibility'],
  },
  {
    id: 4,
    task: 1,
    type: 'formal-letter',
    title: 'Complaint to an airline',
    prompt: `You recently flew with an airline and had a very poor experience. Write a letter of complaint to the airline.

In your letter:
- describe what happened on your flight
- explain how this affected your journey
- say what compensation you expect`,
    keyPoints: [
      'Describe specific problems during the flight',
      'Explain the consequences for your journey',
      'State clearly what compensation is expected',
    ],
    modelAnswer: `Dear Customer Relations Team,

I am writing to make a formal complaint about my experience on flight SK204 from Manchester to Barcelona on 14 October.

The flight was delayed by four hours without any explanation or regular updates from staff. When we finally boarded, I discovered that my pre-booked meal had not been loaded onto the aircraft. Additionally, my checked luggage did not arrive on the same flight and was delivered to my hotel two days later, causing significant inconvenience.

These failures had a serious impact on my trip. The delay caused me to miss a pre-arranged tour that had been paid for in advance. The absence of my luggage meant I was without essential items for the first two days, requiring me to purchase replacement clothing and toiletries at considerable expense.

In view of these circumstances, I am requesting compensation of £250 for the flight delay in line with your stated policy, full reimbursement of the replacement items I was required to purchase (receipts enclosed), and a formal apology for the lack of communication throughout the delay.

I look forward to your response within fourteen days.

Yours faithfully,
R. Simmons`,
    examinerNotes: 'Strong use of formal complaint language (formal complaint, in view of these circumstances, I am requesting). Each bullet point is developed with specific, credible detail. The compensation request is itemised and reasonable. The deadline for response adds appropriate pressure.',
    wordCount: 207,
    difficulty: 'hard',
    tags: ['formal', 'complaint', 'travel'],
  },
  {
    id: 5,
    task: 1,
    type: 'formal-letter',
    title: 'Letter to bank about an error',
    prompt: `You have noticed an error on your recent bank statement. Write a letter to your bank.

In your letter:
- describe the error you have found
- explain why you are certain it is a mistake
- say what action you would like the bank to take`,
    keyPoints: [
      'Describe the specific error on the statement',
      'Explain why it is definitely a mistake',
      'Request specific corrective action',
    ],
    modelAnswer: `Dear Sir or Madam,

I am writing regarding an error I have identified on my bank statement for the period ending 31 October (Account number: 04821763).

The statement shows a debit of £340 on 22 October described as "Online transfer — Ref 88421". I did not authorise this transaction and have no record of making any such payment on that date. I have checked my own records carefully and can confirm that no purchase or transfer of this amount was made by me.

I am certain this is an error for the following reasons: I was abroad on 22 October and made no online transactions on that day, as confirmed by my travel records. Furthermore, this reference number does not correspond to any payee I have used previously.

I would like the bank to investigate this transaction as a matter of urgency, reverse the charge to my account, and provide a written explanation of how the error occurred. I would also request that you check whether my account details have been compromised in any way.

Please contact me at the address above or on 07900 123456.

Yours faithfully,
S. Ahmed`,
    examinerNotes: 'Precise and well-evidenced. The candidate gives account details, transaction details, and specific reasons for certainty — exactly what a formal complaint requires. Three clear actions are requested in the fourth paragraph. Register is consistently formal throughout.',
    wordCount: 203,
    difficulty: 'hard',
    tags: ['formal', 'finance', 'complaint'],
  },

  // ================= TASK 1 — SEMI-FORMAL LETTERS (6–10) =================
  {
    id: 6,
    task: 1,
    type: 'semi-formal-letter',
    title: 'Letter to community centre about a class',
    prompt: `You have seen an advertisement for a new class at your local community centre but you have some questions. Write a letter to the manager.

In your letter:
- explain which class you are interested in
- ask about the details of the course
- enquire about the cost and how to enrol`,
    keyPoints: [
      'Identify the specific class',
      'Ask relevant questions about course details',
      'Ask about cost and enrolment process',
    ],
    modelAnswer: `Dear Manager,

I am writing to enquire about the new photography class advertised in the Westfield Community Centre newsletter last week.

I have been interested in photography for some time and would very much like to join the course. However, before enrolling, I would be grateful if you could answer a few questions. I would like to know how many sessions the course runs for, what time the classes are held, and whether any previous experience or equipment is required. I am also wondering whether the course is suitable for complete beginners.

Regarding cost, the advertisement did not include a price for the full course. Could you please confirm the fee and let me know whether payment is required in full at the time of enrolment, or whether it can be paid in instalments? I would also like to know whether there is currently a place available, as I understand the classes may be popular.

Finally, could you tell me the best way to enrol — whether this can be done online or whether I need to visit the centre in person?

Thank you for your help. I look forward to hearing from you.

Kind regards,
P. Walsh`,
    examinerNotes: 'The semi-formal register is well-judged — more direct than a formal letter but still polite. All three bullet points are addressed with multiple relevant questions. The structure is clear and easy to follow. The closing "Kind regards" is appropriate for this level of formality.',
    wordCount: 196,
    difficulty: 'easy',
    tags: ['semi-formal', 'enquiry', 'leisure'],
  },
  {
    id: 7,
    task: 1,
    type: 'semi-formal-letter',
    title: 'Letter to college about a course',
    prompt: `You are interested in enrolling on a part-time course at a local college. Write a letter to the admissions office.

In your letter:
- explain why you are interested in the course
- ask about the entry requirements
- find out about the timetable and any fees`,
    keyPoints: [
      'Explain motivation for taking the course',
      'Ask about entry requirements',
      'Ask about timetable and fees',
    ],
    modelAnswer: `Dear Admissions Team,

I am writing to enquire about the part-time Business Administration course listed on your website for the coming academic year.

I have been working in an administrative role for the past three years and I am keen to develop my skills and gain a formal qualification. A colleague who completed your course last year spoke very highly of it, and I believe it would significantly improve my career prospects.

Before applying, I would like to know more about the entry requirements. I have GCSEs in English and Maths but no formal business qualifications. I would be grateful if you could confirm whether this level of education would be sufficient for entry to the course.

I would also like some information about the timetable. As I am working full-time, I need to know which days and times the classes run, and approximately how many hours of independent study are expected each week. Could you also confirm the course fees and whether any funding or payment plans are available for part-time students?

Thank you in advance for your assistance. I look forward to receiving your reply.

Kind regards,
M. Okonkwo`,
    examinerNotes: 'Clear reason for interest, well-developed questions on entry requirements, and a practical enquiry about the timetable with the explanation of why it matters (working full-time). Good use of semi-formal register throughout. Word count is appropriate.',
    wordCount: 199,
    difficulty: 'easy',
    tags: ['semi-formal', 'education', 'enquiry'],
  },
  {
    id: 8,
    task: 1,
    type: 'semi-formal-letter',
    title: 'Letter to local newspaper',
    prompt: `You recently read an article in your local newspaper that you disagreed with. Write a letter to the editor.

In your letter:
- refer to the article you read
- explain what you disagreed with and why
- suggest what the newspaper could do differently in future`,
    keyPoints: [
      'Reference the specific article',
      'State the disagreement with reasons',
      'Make a suggestion for the newspaper',
    ],
    modelAnswer: `Dear Editor,

I am writing in response to the article "Car Parks: A Town Centre Success Story", published in the Northfield Gazette on 12 November.

While I appreciate that the newspaper covered local development issues, I strongly disagree with the article's conclusion that expanding car parking facilities is the best way to revive the town centre. The article presented only the views of local business owners and failed to mention the significant environmental concerns raised at the council meeting earlier this month. Increasing car park capacity will simply encourage more traffic into the town centre, worsening congestion and air quality rather than addressing them.

A more balanced approach would have acknowledged the growing number of residents who favour investment in cycling infrastructure and improved public transport links. These alternatives have proven successful in comparable towns nearby and deserve equal coverage.

I would encourage the Gazette to interview a wider range of residents in future, including those who use the town centre on foot or by bicycle, before drawing conclusions about what the community wants. Local newspapers play an important role in shaping public opinion, and balanced reporting matters.

Thank you for publishing this letter.

Yours faithfully,
C. Brown`,
    examinerNotes: 'Refers to the article with specific detail (title, date). The disagreement is well-reasoned, not simply emotional. A constructive suggestion is made in the final body paragraph. Note: "Yours faithfully" is technically more formal but acceptable here — "Kind regards" would also be appropriate.',
    wordCount: 205,
    difficulty: 'hard',
    tags: ['semi-formal', 'opinion', 'community'],
  },
  {
    id: 9,
    task: 1,
    type: 'semi-formal-letter',
    title: 'Letter to sports club about membership',
    prompt: `You would like to join a local sports club. Write a letter to the club secretary.

In your letter:
- explain your interest in the sport
- ask about membership options and costs
- find out how and when you can visit the club`,
    keyPoints: [
      'Explain background and interest in the sport',
      'Ask about membership types and cost',
      'Ask about visiting the club',
    ],
    modelAnswer: `Dear Club Secretary,

I am writing to enquire about membership at Riverside Tennis Club, having recently moved to the area and been recommended to contact you by a colleague.

I have been playing tennis for around five years, mainly at recreational level, though I did compete in club tournaments at my previous club in Sheffield. I am keen to continue playing regularly and would also be interested in joining a team if there are opportunities to do so.

Could you please provide details of the membership options available? I understand there may be different categories — for example, adult, social, and off-peak memberships — and I would appreciate information on what each includes and the annual or monthly fees. I would also like to know whether there is currently a waiting list for new members.

I would very much like to visit the club before making a final decision. Could you let me know when it would be convenient to come and have a look around, and whether there is any opportunity to try the facilities before committing to membership?

I look forward to hearing from you.

Kind regards,
T. Griffiths`,
    examinerNotes: 'Personal context is given naturally without being excessive. Questions are specific and practical. The request to visit before joining is a realistic, well-developed point. Register is appropriately semi-formal — friendly but still polite and organised.',
    wordCount: 197,
    difficulty: 'easy',
    tags: ['semi-formal', 'leisure', 'enquiry'],
  },
  {
    id: 10,
    task: 1,
    type: 'semi-formal-letter',
    title: 'Letter to manager about a colleague',
    prompt: `You have a problem with a colleague at work that is affecting your performance. Write a letter to your manager.

In your letter:
- describe the situation with your colleague
- explain how it is affecting your work
- suggest how the situation could be resolved`,
    keyPoints: [
      'Describe the workplace problem clearly',
      'Explain the impact on work performance',
      'Suggest a resolution',
    ],
    modelAnswer: `Dear Ms Thornton,

I am writing to bring a workplace matter to your attention that I feel I am unable to resolve without your support.

Over the past month, I have been experiencing difficulties in my working relationship with a colleague, Tom Bradshaw. On several occasions, Tom has interrupted meetings when I am presenting, talked over me in front of clients, and taken credit for work that was completed jointly. I have tried to address this directly with Tom on two separate occasions, but the behaviour has continued.

This situation is beginning to affect my work. I find it difficult to concentrate on tasks knowing that my contributions may be dismissed or attributed to others. As a result, my confidence in client-facing situations has decreased, and I am concerned that this is becoming visible in my performance.

I believe a brief, structured meeting between the three of us — facilitated by yourself — could help clarify expectations and resolve the issue professionally. Alternatively, I would welcome the opportunity to speak with you privately first if you feel that would be more appropriate. I am not seeking a formal outcome at this stage; I simply want to find a way to work together more effectively.

Thank you for your time.

Kind regards,
L. Foster`,
    examinerNotes: 'Sensitive topic handled professionally. Specific examples are given without being overly dramatic. The impact is described in concrete terms (confidence, performance). The proposed resolution is measured and reasonable, which reflects well on the writer. Good use of semi-formal register.',
    wordCount: 213,
    difficulty: 'hard',
    tags: ['semi-formal', 'work', 'interpersonal'],
  },

  // ================= TASK 1 — INFORMAL LETTERS (11–15) =================
  {
    id: 11,
    task: 1,
    type: 'informal-letter',
    title: 'Recommend a place to visit',
    prompt: `A friend is planning to visit the area where you live. Write a letter recommending things to see and do.

In your letter:
- tell your friend about the best places to visit
- recommend things to eat and drink locally
- suggest the best time of year to come`,
    keyPoints: [
      'Recommend specific places to visit',
      'Suggest local food and drink',
      'Advise on the best time to visit',
    ],
    modelAnswer: `Dear Sofia,

I was so excited to hear you're planning to visit! I can't wait to show you around — there is so much to see here.

The absolute must-see is the old harbour area. The views are stunning, especially in the evenings when all the fishing boats come in. There's also a brilliant little art gallery just behind the main square that has some amazing local work. If you have time, the nature reserve about twenty minutes outside town is well worth a visit too — we could hire bikes and make a day of it.

For food, you have to try the fish and chips from the place on the seafront — it's been there for over fifty years and is genuinely the best I've ever had. There's also a fantastic little market on Sunday mornings where you can try all kinds of local cheeses and homemade bread. I'll take you there for breakfast!

The best time to come is definitely late May or early June — the weather is lovely, but it's not too crowded with tourists yet. August gets really busy and parking is a nightmare. Let me know your dates and I'll book us into the nice little restaurant by the lighthouse.

Can't wait!

Best wishes,
Priya`,
    examinerNotes: 'Natural, warm informal register throughout. Specific recommendations are given with reasons — not just a list of places. Personal touches (hiring bikes, taking the friend to breakfast) make the response feel authentic. The advice on timing is specific and practical.',
    wordCount: 218,
    difficulty: 'easy',
    tags: ['informal', 'travel', 'recommendation'],
  },
  {
    id: 12,
    task: 1,
    type: 'informal-letter',
    title: 'Explain a life decision to a friend',
    prompt: `You have recently made an important decision about your career or lifestyle. Write a letter to a friend explaining your decision.

In your letter:
- explain what decision you have made
- describe why you made this decision
- say what you are hoping will happen as a result`,
    keyPoints: [
      'State the decision clearly',
      'Explain the reasons behind it',
      'Describe the hoped-for outcome',
    ],
    modelAnswer: `Dear Marcus,

I have some big news! I've decided to leave my job at the bank and go back to university to study graphic design. I know it might sound a bit mad, but let me explain.

I've been unhappy at work for a while now, if I'm honest. The job pays well, but I spend most of the day doing things I don't really enjoy, and I've been feeling more and more like I'm wasting time I could be spending on something creative. You know I've always loved drawing and photography — well, I finally decided to stop putting it off and actually do something about it.

The course starts in September and runs for three years. I know it's a big financial change, and I've had to think carefully about it, but I've saved up enough to cover the first year, and there are bursaries available too.

I'm really hoping that by the end of the course I'll be able to find work as a designer — ideally in film or TV, which has always been my dream. Even if it's hard at first, I think I'll regret it more if I don't try.

Anyway, enough about me — how are things with you? Let's catch up soon.

Take care,
Jamie`,
    examinerNotes: 'Genuine informal register with natural transitions. The decision is clearly stated, the reasoning is personal and convincing, and the future hopes are specific. Good use of informal structures (a bit mad, if I\'m honest, let\'s catch up). Word count is appropriate.',
    wordCount: 227,
    difficulty: 'medium',
    tags: ['informal', 'career', 'personal'],
  },
  {
    id: 13,
    task: 1,
    type: 'informal-letter',
    title: 'Invite a friend to an event',
    prompt: `You are organising a special event and would like a friend to come. Write a letter inviting them.

In your letter:
- describe the event and why it is special
- explain what will happen at the event
- tell your friend what they need to know to attend`,
    keyPoints: [
      'Describe the event and its significance',
      'Explain what will happen',
      'Give practical information for attending',
    ],
    modelAnswer: `Dear Nadia,

I hope you're well! I'm writing because I'd love for you to come to something really special next month.

You might remember me mentioning that I've been working on a short film for the past year. Well, we've finally finished it, and we're holding a small screening at the Cornerhouse Cinema on Saturday 8th December — and I really want you to be there. It would mean a lot to me to have my closest friends in the audience.

The evening starts at 7pm with drinks and a chance to meet the rest of the cast and crew. The film itself is about forty minutes long, and afterwards we're planning a Q&A session where the audience can ask questions. It should all be finished by around 10pm, and there's a small after-party at the café next door if you're up for it.

In terms of practicalities — the cinema is right in the city centre, about five minutes' walk from the main train station. Entry is free, but I do need to know numbers in advance, so could you let me know by the end of next week whether you can make it? Just reply to this letter or drop me a text.

I really hope you can come!

Best wishes,
Elena`,
    examinerNotes: 'Warm, enthusiastic tone appropriate for an informal invitation. The event is described with personal significance. Practical information (date, time, location, how to confirm) is all included naturally within the letter. Good balance of personal and practical content.',
    wordCount: 223,
    difficulty: 'easy',
    tags: ['informal', 'social', 'event'],
  },
  {
    id: 14,
    task: 1,
    type: 'informal-letter',
    title: 'Ask a friend for advice',
    prompt: `You are facing a difficult decision and would like advice from a friend who has been in a similar situation. Write a letter asking for their help.

In your letter:
- explain the situation you are in
- describe why the decision is difficult
- ask your friend specifically for their advice`,
    keyPoints: [
      'Explain the situation clearly',
      'Describe why the decision is hard',
      'Ask for specific advice',
    ],
    modelAnswer: `Dear Kofi,

I hope you're doing well. I'm writing because I'm in a bit of a dilemma at the moment, and you're one of the few people I know who's actually been through something similar.

Here's the situation: I've been offered a job in another city. It's a great opportunity — better pay, more responsibility, and the kind of role I've been working towards for a while. The problem is that my partner doesn't want to move, my parents are getting older and I like being close to them, and honestly, I've lived here my whole life and the idea of leaving feels quite daunting.

The thing is, I know I might regret it if I don't go. But I also know I might regret it if I do. I've been going back and forth for weeks now and I'm no closer to a decision.

You went through something very similar when you took the job in Edinburgh, didn't you? I'd love to know how you made the decision, whether you have any regrets, and what advice you'd give to someone in my position. Did you find it got easier once you'd actually made the move, or was it as hard as you expected?

Any thoughts would be really welcome. Thanks in advance.

Best wishes,
Ola`,
    examinerNotes: 'The situation is explained with natural detail and genuine emotional honesty. The difficulty is well-articulated. Specific questions are asked in the final paragraph, which directly addresses the third bullet point. Informal register is sustained throughout without being too casual.',
    wordCount: 233,
    difficulty: 'medium',
    tags: ['informal', 'personal', 'advice'],
  },
  {
    id: 15,
    task: 1,
    type: 'informal-letter',
    title: 'Update a friend on a life change',
    prompt: `You have recently moved to a new home. Write a letter to an old friend updating them on your new life.

In your letter:
- describe your new home and area
- explain how your life has changed since moving
- invite your friend to come and visit`,
    keyPoints: [
      'Describe the new home and neighbourhood',
      'Explain changes to daily life',
      'Extend a genuine invitation to visit',
    ],
    modelAnswer: `Dear Yuki,

It feels like ages since we've been in touch properly, and I have quite a lot of news to share! As you might have seen on social media, I finally made the move to Bristol that I'd been talking about for years.

The flat is lovely — it's on the top floor of an old converted warehouse near the waterfront, so the views are incredible, especially in the evenings. The area has a great independent food and music scene, and I'm literally a ten-minute walk from the Clifton Suspension Bridge, which still feels surreal.

Life has changed quite a bit since moving. I cycle to work now instead of taking the underground, which has done wonders for my mood, and I've already joined a running club and a book group. It feels like starting over in the best possible way — I know far fewer people here, but everyone has been incredibly welcoming.

The reason I'm writing is that I'd love for you to come and stay. I've got a proper spare room now, which is new! If you can make it before the summer, I can take you to the Christmas market in December — it's apparently spectacular. Just let me know what dates might work for you.

Hope everything is going well with you!

Take care,
Ben`,
    examinerNotes: 'All three bullet points are addressed with vivid, specific detail. The description of the new home is visual and engaging. The changes to daily life feel authentic. The invitation is warm and includes practical information (the spare room, suggested timing). Strong informal register throughout.',
    wordCount: 228,
    difficulty: 'easy',
    tags: ['informal', 'personal', 'social'],
  },

  // ================= TASK 2 — OPINION ESSAYS (16–20) =================
  {
    id: 16,
    task: 2,
    type: 'opinion-essay',
    title: 'Social media and personal relationships',
    prompt: `Some people believe that social media has had a mostly negative effect on personal relationships. Others disagree and think it has brought people closer together.

What is your opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
    keyPoints: [
      'State a clear opinion in the introduction',
      'Give two or more developed reasons with examples',
      'Acknowledge the opposing view briefly',
    ],
    modelAnswer: `Social media has transformed the way people communicate, and opinion on its effect on relationships is sharply divided. In my view, while social media offers certain benefits, it has overall had a damaging effect on the quality of personal relationships.

One of the main problems with social media is that it encourages shallow interaction at the expense of meaningful connection. People may have hundreds of online "friends" but rarely engage in the deep, sustained conversation that builds genuine relationships. Studies have shown that heavy social media users often report feeling more lonely than those who use it less, suggesting that quantity of online contact does not replace quality of face-to-face interaction.

Furthermore, social media creates unrealistic expectations in relationships. People present curated, idealised versions of their lives online, which can lead others to feel inadequate by comparison. This has been linked to increased rates of anxiety and dissatisfaction in relationships, particularly among younger people.

Those who argue that social media brings people closer together have a point — it does allow people to maintain contact across distances, and it has helped many people find communities they might not otherwise have accessed. However, these benefits do not outweigh the broader damage to the depth and authenticity of human connection.

In conclusion, I believe social media has weakened rather than strengthened personal relationships, primarily by prioritising convenience over genuine emotional engagement.`,
    examinerNotes: 'Clear opinion stated in the introduction and maintained throughout. Two body paragraphs each develop a distinct argument with explanation and evidence. The counterargument is acknowledged but refuted. The conclusion restates the position without simply repeating the introduction.',
    wordCount: 257,
    difficulty: 'medium',
    tags: ['opinion', 'technology', 'society'],
  },
  {
    id: 17,
    task: 2,
    type: 'opinion-essay',
    title: 'The future of remote working',
    prompt: `Many companies are now allowing employees to work from home permanently. Some people think this is a positive development, while others believe it is harmful.

What is your opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
    keyPoints: [
      'Give a clear personal opinion',
      'Support with specific reasons and examples',
      'Consider potential drawbacks briefly',
    ],
    modelAnswer: `The rise of permanent remote working is one of the most significant changes in modern employment. In my opinion, it is broadly a positive development, provided that it is managed carefully and does not become the only option available to workers.

The primary benefit of remote working is the flexibility it offers employees. Without the need to commute, workers can recover up to two hours each day, which can be devoted to family, exercise, or rest. Research conducted after the shift to remote working during the pandemic found that many employees reported higher levels of job satisfaction and output when working from home. This suggests that, for many roles, remote work is not simply a convenience but an improvement.

Remote working also has significant environmental benefits. Fewer people commuting by car reduces carbon emissions and congestion in cities. For employers, the reduced need for large office spaces lowers overhead costs, savings which can be passed on to employees or invested in the business.

However, I recognise that remote working is not suitable for everyone. Some employees, particularly younger workers or those in small living spaces, find it isolating and difficult to maintain clear boundaries between work and home life. For these individuals, a hybrid model — combining some days in the office with some at home — is likely a better solution.

On balance, I believe the shift towards remote working represents progress, as long as flexibility rather than obligation is the guiding principle.`,
    examinerNotes: 'Opinion is clearly stated and consistently held. Two strong arguments are developed in body paragraphs 1 and 2. A genuine concession is made in paragraph 3 without undermining the overall position. Academic vocabulary used accurately (primary benefit, hybrid model, guiding principle).',
    wordCount: 262,
    difficulty: 'medium',
    tags: ['opinion', 'work', 'society'],
  },
  {
    id: 18,
    task: 2,
    type: 'opinion-essay',
    title: 'Regulating fast food',
    prompt: `Some people believe that governments should introduce stricter regulations on fast food companies, including limiting advertising and adding health warnings to products. Others think this is unnecessary government interference.

What is your opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
    keyPoints: [
      'State a clear position on government regulation',
      'Give reasons with examples',
      'Address the opposing argument',
    ],
    modelAnswer: `Obesity and diet-related illness represent one of the greatest public health challenges of the twenty-first century, and fast food companies contribute significantly to this problem. In my view, governments are not only justified in regulating this industry more strictly — they have an obligation to do so.

Advertising is one of the most powerful tools fast food companies use to attract customers, and much of it is deliberately targeted at children. Research consistently shows that children who are exposed to frequent food advertising make less healthy choices, often without being aware of the influence. Restricting advertising before the watershed, as several countries have already done, is a sensible and proportionate measure that protects vulnerable consumers without banning products altogether.

Adding health information to packaging is equally justified. Consumers already benefit from nutritional labels on supermarket food — there is no logical reason why this transparency should not extend to fast food. Informed adults are better placed to make choices that suit their health needs, and clearer labelling costs the industry relatively little.

Critics argue that regulation represents unwanted interference in personal freedom. However, governments already regulate tobacco, alcohol, and gambling precisely because the costs of inaction fall on wider society. The health costs of poor diet — NHS treatment, reduced productivity, early death — are borne by taxpayers, not fast food companies. Regulation is therefore justified on grounds of fairness as well as public health.

In conclusion, the case for regulating fast food is strong. Freedom of choice is best exercised when consumers have accurate information.`,
    examinerNotes: 'Confident, well-argued essay with a clear and consistently held opinion. Both body paragraphs address specific regulatory measures with concrete justifications. The counterargument is dealt with directly and logically. Strong academic register throughout. Word count slightly over 250 — appropriate for Task 2.',
    wordCount: 271,
    difficulty: 'hard',
    tags: ['opinion', 'health', 'society'],
  },
  {
    id: 19,
    task: 2,
    type: 'opinion-essay',
    title: 'Public transport vs private cars',
    prompt: `Some people think that governments should invest more in public transport and discourage the use of private cars in cities. Others believe that people should be free to use their cars as they choose.

What is your opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
    keyPoints: [
      'State opinion on investment in public transport',
      'Give specific reasons with examples',
      'Acknowledge personal freedom argument',
    ],
    modelAnswer: `Traffic congestion and air pollution in cities have reached levels that damage both health and quality of life. In my view, governments should actively invest in public transport and introduce measures to reduce private car use in urban areas, even if this limits individual choice to some degree.

The environmental case for this policy is compelling. Private cars are a leading source of urban air pollution, which the World Health Organisation links to millions of premature deaths annually. Cities that have invested heavily in metro systems, trams, and cycling infrastructure — such as Amsterdam, Vienna, and Bogotá — have demonstrated that it is possible to move large numbers of people efficiently without the environmental cost of mass car ownership.

Beyond the environment, public transport makes cities more equitable. Not everyone can afford a car, and in cities where driving is assumed to be the primary means of travel, those without vehicles are disadvantaged. A well-funded public transport network ensures that access to employment, healthcare, and education does not depend on car ownership.

I acknowledge that restrictions on car use feel like an infringement of personal freedom, and some journeys — particularly outside city centres — are genuinely difficult to make by public transport. A graduated approach, making public transport cheap and reliable before introducing charges or restrictions on car use, would be fairer than an abrupt ban.

Nevertheless, the benefits of investing in public transport — for health, equality, and the environment — clearly outweigh the inconvenience to drivers.`,
    examinerNotes: 'Strong structure with a clear thesis. Two well-developed arguments in body paragraphs. The freedom argument is addressed with nuance and a proposed middle-ground solution, which demonstrates sophisticated thinking. Academic vocabulary and sentence structure are appropriate for Band 7.',
    wordCount: 265,
    difficulty: 'hard',
    tags: ['opinion', 'environment', 'society'],
  },
  {
    id: 20,
    task: 2,
    type: 'opinion-essay',
    title: 'Compulsory volunteering for students',
    prompt: `Some educational institutions require students to complete a period of community volunteering as part of their studies. Others believe volunteering should always be a personal choice.

What is your opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
    keyPoints: [
      'Give a clear opinion on compulsory volunteering',
      'Develop reasons with examples',
      'Address the choice argument',
    ],
    modelAnswer: `Volunteering is widely valued for the benefits it brings both to communities and to individuals. However, I believe that making it compulsory for students is fundamentally at odds with the spirit of voluntary service, and risks undermining the very benefits it seeks to promote.

The word "volunteering" implies a free, personal decision to give one's time. When schools or universities attach grades, credits, or graduation requirements to this activity, they transform it into an obligation. Students who volunteer unwillingly are unlikely to engage meaningfully with the communities they serve, which reduces the value of their contribution and may leave them with a negative impression of community service overall.

Furthermore, compulsory volunteering raises questions of fairness. Many students hold part-time jobs to support themselves financially, and adding a mandatory unpaid commitment places a disproportionate burden on those from lower-income backgrounds. What appears to be a universal benefit may in practice favour students who have more free time and greater financial security.

Supporters of compulsory schemes argue that many students would never volunteer otherwise, and that exposure to the experience is itself valuable. This is a reasonable point. However, there are better ways to encourage volunteering — for example, through information, incentives, and building community partnerships — than through compulsion. Schools that have adopted these approaches often report higher rates of genuine engagement than those with mandatory requirements.

In conclusion, while volunteering is undoubtedly beneficial, it achieves its purpose only when freely chosen.`,
    examinerNotes: 'Clearly held opinion, logically argued. The first body paragraph addresses the definitional contradiction in compulsory volunteering. The second raises an equity argument that shows broader thinking. The counterargument is acknowledged and answered. Strong conclusion.',
    wordCount: 264,
    difficulty: 'hard',
    tags: ['opinion', 'education', 'society'],
  },

  // ================= TASK 2 — DISCUSS BOTH VIEWS (21–25) =================
  {
    id: 21,
    task: 2,
    type: 'discuss-essay',
    title: 'Technology replacing teachers',
    prompt: `Some people believe that technology will eventually replace teachers in schools. Others think that teachers will always be essential.

Discuss both views and give your own opinion.`,
    keyPoints: [
      'Present the argument that technology can replace teachers',
      'Present the argument that teachers are irreplaceable',
      'Give a clear personal opinion',
    ],
    modelAnswer: `The rapid development of educational technology has prompted debate about whether teachers remain necessary in a world where students can access high-quality instruction online. Both sides of this argument have merit, though I believe the human role in education cannot ultimately be replaced by technology.

Those who argue that technology could replace teachers point to the growing availability of adaptive learning platforms, video lectures from world-class educators, and AI tutoring systems that can personalise instruction to an individual student's pace and needs. In some subjects, particularly those with clear right and wrong answers, these tools already deliver results comparable to classroom teaching, and they are available at any time and at lower cost.

However, the case for human teachers rests on aspects of education that technology cannot replicate. Teaching is not merely the transmission of information — it involves motivating students who have lost interest, identifying the emotional or social barriers to learning, and modelling the kind of thoughtful, ethical reasoning that students need to develop as citizens. A student struggling with confidence, a learning difficulty, or a difficult home situation requires a response that no algorithm can adequately provide.

In my opinion, technology is most valuable as a tool that enhances teaching rather than replaces it. The schools that achieve the best outcomes are typically those that use technology to free teachers from repetitive administrative tasks, allowing them to focus on the relational, creative, and motivational aspects of their role.

Technology will change teaching profoundly, but the human teacher will remain essential for the foreseeable future.`,
    examinerNotes: 'Both views are presented fairly and developed with specific examples. The personal opinion is clearly stated and integrated into the conclusion rather than just appended. Good range of academic vocabulary. Clear structure with an introduction, two body paragraphs, opinion paragraph, and conclusion.',
    wordCount: 271,
    difficulty: 'medium',
    tags: ['discuss', 'technology', 'education'],
  },
  {
    id: 22,
    task: 2,
    type: 'discuss-essay',
    title: 'Living in cities vs the countryside',
    prompt: `Some people prefer to live in cities, while others choose to live in rural areas.

Discuss the advantages and disadvantages of living in each environment and give your own opinion about which is preferable.`,
    keyPoints: [
      'Discuss advantages and disadvantages of city living',
      'Discuss advantages and disadvantages of rural living',
      'Give a clear personal preference',
    ],
    modelAnswer: `Where we choose to live has a profound effect on our daily experience, and the debate between urban and rural life reflects genuinely different priorities and values. Both environments offer distinct benefits and limitations.

City living offers unmatched access to employment, cultural activities, healthcare, and public transport. For young professionals and those with specialised careers, the opportunities available in a major city are simply not replicable elsewhere. However, the benefits come at a cost: cities are typically more expensive, noisier, and more polluted, and research consistently shows that urban residents report higher levels of stress and loneliness than those in rural communities.

Rural life, by contrast, offers space, quieter surroundings, a stronger sense of community, and lower living costs. Many people who move to the countryside report improvements in mental health and quality of life. The disadvantages are equally significant, however — limited employment options, reduced access to specialist healthcare, and the isolation that can come with living far from friends and services.

In my view, neither environment is universally superior — the right choice depends on an individual's circumstances and priorities. For families with young children and those who value community and outdoor space, rural living offers real advantages. For those building careers or seeking cultural and social variety, cities remain difficult to replace.

If I were to express a personal preference, I would choose a mid-sized city or market town — large enough to offer opportunity and amenity, but small enough to retain the community feel that large cities often lack.`,
    examinerNotes: 'Structured to address both environments fairly and in roughly equal depth. Advantages and disadvantages are clearly labelled and developed. The personal opinion is nuanced and well-reasoned rather than a simple preference statement. Good academic vocabulary throughout.',
    wordCount: 268,
    difficulty: 'medium',
    tags: ['discuss', 'society', 'lifestyle'],
  },
  {
    id: 23,
    task: 2,
    type: 'discuss-essay',
    title: 'Traditional vs online shopping',
    prompt: `Shopping habits have changed significantly in recent years, with more people choosing to buy goods online rather than in physical shops.

Discuss the advantages of both forms of shopping and give your own opinion about which is better.`,
    keyPoints: [
      'Discuss the advantages of online shopping',
      'Discuss the advantages of shopping in physical stores',
      'State a personal preference with reasons',
    ],
    modelAnswer: `The growth of online retail has fundamentally transformed how people purchase goods, raising questions about the long-term future of traditional high street shopping. Both methods offer genuine benefits, and many people now use both depending on what they are buying.

Online shopping offers convenience that physical stores cannot match. Consumers can browse thousands of products at any time, compare prices instantly, and have items delivered to their door — often within twenty-four hours. For people with busy schedules, limited mobility, or those in rural areas far from shops, these advantages are substantial. Price comparison tools and customer reviews also tend to make online shoppers more informed than those who shop in-store.

Physical shops, on the other hand, offer experiences that online platforms cannot replicate. The ability to see, touch, and try products before buying reduces the risk of disappointment, which is particularly important for clothing, furniture, and fresh food. Shopping in person also supports local economies and provides the social dimension of browsing in a community environment — something that has significant value for many people, particularly older consumers.

In my opinion, neither method is categorically better — the most sensible approach is to use each for its strengths. For routine purchases, groceries, and researched decisions, online shopping is hard to beat. For clothing, specialist items, and products where physical assessment matters, visiting a shop remains the wiser choice.

The future of retail likely lies in a blend of both, where physical stores focus on experience and expertise rather than competing on price or convenience.`,
    examinerNotes: 'Balanced, well-developed essay. Both sides are given equal space and specific examples. The opinion avoids being overly simplistic by advocating a pragmatic blend. Good use of complex sentence structures and vocabulary (substantially, categorically, pragmatic blend).',
    wordCount: 265,
    difficulty: 'medium',
    tags: ['discuss', 'technology', 'society'],
  },
  {
    id: 24,
    task: 2,
    type: 'discuss-essay',
    title: 'Working abroad',
    prompt: `Some people choose to spend a period of their career working in a foreign country. Others prefer to remain in their home country throughout their working lives.

Discuss the benefits of each approach and give your own opinion.`,
    keyPoints: [
      'Discuss benefits of working abroad',
      'Discuss benefits of staying in home country',
      'Give a personal opinion',
    ],
    modelAnswer: `Working abroad has become an increasingly common career choice, particularly for younger professionals seeking broader experience. Like staying in one's home country, it offers distinct advantages — and the right choice often depends on individual circumstances and priorities.

Those who choose to work abroad benefit in several important ways. Living and working in another culture develops adaptability, language skills, and a broader perspective — qualities that employers value highly. International experience can also accelerate career progression in certain fields such as finance, technology, and development, where global mobility is rewarded. Beyond the professional benefits, living abroad offers significant personal growth, exposing individuals to new ways of life and building resilience.

Remaining in one's home country, however, is far from a lesser choice. Professional networks built over years are difficult to replicate elsewhere, and deep local expertise in a particular market, legal system, or cultural context can be just as valuable as international breadth. There are also personal advantages: proximity to family and friends, familiarity with language and culture, and the stability that comes with long-term roots in a community.

In my opinion, a period of working abroad — particularly early in one's career — is enormously valuable, even if the long-term plan is to return home. The perspective and resilience gained rarely disappear, and the experience tends to make individuals more effective wherever they ultimately work.

Ultimately, neither path is superior in isolation; both contribute to a well-rounded professional and personal life when chosen intentionally.`,
    examinerNotes: 'Both positions receive clear, well-supported arguments. The personal opinion is integrated thoughtfully rather than forced. Good range of vocabulary, including some less common collocations (career progression, deep local expertise, long-term roots). Conclusion is appropriately balanced.',
    wordCount: 262,
    difficulty: 'medium',
    tags: ['discuss', 'work', 'lifestyle'],
  },
  {
    id: 25,
    task: 2,
    type: 'discuss-essay',
    title: 'Nuclear vs renewable energy',
    prompt: `Some scientists argue that nuclear energy is the most effective solution to the world\'s growing energy needs. Others believe investment should focus on renewable sources such as wind and solar power.

Discuss both views and give your own opinion.`,
    keyPoints: [
      'Present the case for nuclear energy',
      'Present the case for renewable energy',
      'State and support a personal opinion',
    ],
    modelAnswer: `As the global demand for energy continues to rise and the urgency of climate change becomes clearer, the debate over the best energy strategy has intensified. Both nuclear power and renewable sources such as wind and solar have committed advocates, and understanding the merits of each is essential to forming a reasoned view.

The case for nuclear energy rests primarily on its reliability and energy density. Unlike wind and solar, nuclear plants generate electricity continuously regardless of weather conditions, making them well-suited to providing the stable "baseload" power that economies depend on. Modern reactor designs have significantly improved safety records, and nuclear power produces virtually no carbon emissions during operation — a crucial advantage in any credible decarbonisation strategy.

Advocates for renewables point to dramatically falling costs, particularly in solar energy, and the absence of risks associated with nuclear waste and potential accidents. Wind and solar installations can be deployed quickly and at scale, and unlike nuclear plants — which take a decade or more to build — they can deliver results within the timeframes that climate science demands.

In my view, the most sensible approach is to treat these as complementary rather than competing solutions. Nuclear power can provide stable baseload capacity while renewable infrastructure is scaled up, with the long-term aim of transitioning to a fully renewable grid once storage technology matures. Insisting on one approach to the exclusion of the other risks slowing progress at precisely the moment when speed matters most.

A pragmatic energy strategy will draw on the strengths of both.`,
    examinerNotes: 'Both views are presented accurately and without bias. The opinion advocates a nuanced middle ground, which is a sophisticated and well-argued position. Technical vocabulary is used correctly (baseload, decarbonisation, storage technology). Strong conclusion that avoids unnecessary repetition.',
    wordCount: 267,
    difficulty: 'hard',
    tags: ['discuss', 'environment', 'technology'],
  },

  // ================= TASK 2 — PROBLEM/SOLUTION & ADVANTAGES/DISADVANTAGES (26–30) =================
  {
    id: 26,
    task: 2,
    type: 'problem-solution',
    title: 'Rising obesity rates',
    prompt: `Obesity rates have increased significantly in many countries in recent decades.

What are the main causes of this problem, and what measures could be taken to address it?`,
    keyPoints: [
      'Identify main causes of rising obesity',
      'Suggest realistic solutions',
      'Develop points with explanation or examples',
    ],
    modelAnswer: `Rising obesity rates represent one of the most pressing public health challenges of our time, with significant consequences for individuals, healthcare systems, and economies. The causes are well understood, and effective solutions exist — though they require commitment from governments, industries, and individuals alike.

The primary driver of increased obesity is a profound change in diet and lifestyle over the past half-century. The widespread availability of cheap, calorie-dense processed food — high in sugar, fat, and salt — has made poor nutritional choices the path of least resistance for many consumers. At the same time, urbanisation and technology have dramatically reduced the amount of physical activity built into daily life: fewer people walk to work, more children travel by car rather than on foot, and sedentary screen-based leisure has replaced active pursuits.

Addressing this problem requires action at multiple levels. Governments have a role in regulating the food industry — limiting advertising of unhealthy products to children, requiring clearer nutritional labelling, and using taxation to make healthier foods more accessible relative to processed alternatives. The UK's soft drinks industry levy has already demonstrated that targeted fiscal measures can shift consumer behaviour.

Schools can integrate nutrition education and daily physical activity into curricula, establishing healthy habits early. Employers can support active commuting and provide healthier workplace food options. Urban planners can design environments that encourage walking and cycling rather than car dependency.

No single measure will solve the problem. A sustained, multi-level approach addressing both individual behaviour and the environments that shape it is the only realistic path forward.`,
    examinerNotes: 'Causes are explained with depth rather than simply listed. Solutions are specific, varied, and clearly linked to the causes identified. Good use of evidence (the UK soft drinks levy). Academic vocabulary and sentence structure are appropriate throughout. Word count is appropriate for Task 2.',
    wordCount: 264,
    difficulty: 'hard',
    tags: ['problem-solution', 'health', 'society'],
  },
  {
    id: 27,
    task: 2,
    type: 'problem-solution',
    title: 'Plastic waste and the environment',
    prompt: `Plastic waste is causing serious environmental damage in many parts of the world.

What are the causes of this problem, and what solutions would you suggest?`,
    keyPoints: [
      'Explain the main causes of plastic pollution',
      'Suggest practical solutions',
      'Develop points with specific examples',
    ],
    modelAnswer: `Plastic pollution has become one of the defining environmental crises of our era, with millions of tonnes entering the world's oceans, rivers, and landscapes each year. Understanding the causes is essential before effective solutions can be implemented.

The most fundamental cause is the design of modern economies around single-use plastic products. Packaging, bottles, bags, and utensils are manufactured to be used once and discarded, yet they persist in the environment for hundreds of years. This system exists because plastic is inexpensive to produce and convenient for both manufacturers and consumers. Without economic incentives to change this model, the default behaviour of individuals and businesses will remain unchanged.

A secondary cause is the inadequacy of waste management infrastructure in many parts of the world. Even where recycling systems exist, significant quantities of plastic are contaminated or mixed with other materials, making them unrecyclable in practice.

Effective solutions address both the supply and management sides of the problem. At the supply end, governments should require manufacturers to take responsibility for the end-of-life disposal of their products — so-called extended producer responsibility — creating a financial incentive to reduce packaging. Banning the most problematic single-use items, as the EU has done with plastic straws and cutlery, removes them from circulation entirely.

On the management side, investment in recycling infrastructure — particularly in lower-income countries where street collection is unreliable — is essential. Public education campaigns that make recycling both easy and habitual also have a demonstrated impact.

Plastic pollution is a structural problem that requires structural solutions, not simply individual behaviour change.`,
    examinerNotes: 'Causes are explained with economic reasoning rather than surface-level observation. Solutions directly correspond to the causes identified. The EU reference provides a credible real-world example. The final sentence is a strong, quotable conclusion that reflects sophisticated thinking.',
    wordCount: 271,
    difficulty: 'hard',
    tags: ['problem-solution', 'environment', 'society'],
  },
  {
    id: 28,
    task: 2,
    type: 'advantages-disadvantages',
    title: 'International tourism',
    prompt: `International tourism has grown significantly in recent decades and now plays a major role in many countries\' economies.

What are the advantages and disadvantages of this growth in tourism?`,
    keyPoints: [
      'Discuss specific advantages of tourism growth',
      'Discuss specific disadvantages',
      'Develop each point with explanation',
    ],
    modelAnswer: `The global expansion of international tourism has brought profound economic and cultural changes to many destinations. While tourism generates real benefits, it also creates significant challenges that are increasingly difficult to ignore.

The most widely cited advantage of tourism is its contribution to local and national economies. In countries such as Thailand, Greece, and Kenya, tourism accounts for a substantial proportion of GDP, directly employing millions of people in hospitality, transport, and related sectors. The foreign exchange generated by visitors funds public infrastructure and services that would otherwise be unaffordable. Tourism also facilitates cultural exchange, fostering understanding between different societies and — in some cases — providing financial support for the preservation of historic sites and traditions.

However, the growth of tourism has created serious problems for many destinations. Overcrowding in popular locations — Venice, Barcelona, and Machu Picchu among them — has degraded the quality of life for residents, driven up property prices, and damaged the very environments that attract visitors in the first place. Mass tourism contributes significantly to carbon emissions through air travel, an environmental cost that is rarely borne by the tourists themselves. There are also cultural costs: the commercialisation of local traditions to suit tourist expectations can erode authenticity and create economic dependency on an industry vulnerable to global events.

In conclusion, while international tourism brings genuine economic and cultural benefits, its growth requires careful management to prevent irreversible environmental and social harm. Sustainable tourism policies — limiting visitor numbers, directing revenue to conservation, and encouraging off-season travel — are essential to preserving what makes destinations worth visiting.`,
    examinerNotes: 'Specific examples are given for both advantages and disadvantages (named countries and cities), which adds credibility. The conclusion offers a balanced summary and proposes solutions, demonstrating a level of critical thinking appropriate for Band 7. Good range of vocabulary throughout.',
    wordCount: 264,
    difficulty: 'medium',
    tags: ['advantages-disadvantages', 'travel', 'economy'],
  },
  {
    id: 29,
    task: 2,
    type: 'advantages-disadvantages',
    title: 'Taking a gap year',
    prompt: `Many young people choose to take a gap year between finishing school and starting university or work.

What are the advantages and disadvantages of taking a gap year?`,
    keyPoints: [
      'Discuss specific advantages of a gap year',
      'Discuss specific disadvantages',
      'Develop each point with examples or reasoning',
    ],
    modelAnswer: `The gap year — a period of one year taken between completing school and beginning higher education or employment — has become an increasingly popular choice among young people in many countries. Like most significant life decisions, it carries both clear benefits and genuine risks.

The primary advantage of a gap year is the opportunity for personal development that structured education rarely provides. Young people who travel independently, undertake voluntary work, or gain work experience during a gap year typically develop practical skills such as problem-solving, financial management, and cross-cultural communication. Employers and universities frequently view these qualities positively, recognising that a well-planned gap year can produce more mature, self-directed applicants. Research suggests that students who take a structured gap year often perform better academically on return than those who proceed directly from school.

On the other hand, a gap year carries significant risks if it is not planned carefully. Students who spend twelve months without clear goals may find that the time passes without producing the anticipated benefits, leaving them less prepared rather than more. There is also the financial dimension: gap years can be expensive, and without savings or family support, the cost may require taking on debt or missing the year's work experience that peers have accumulated. Additionally, re-entry into academic study after a year away can be difficult for some students, particularly in technical subjects.

In conclusion, a gap year can be a highly valuable experience, but its benefits are closely tied to the quality of planning and purpose behind it. For motivated, well-prepared individuals, it is an opportunity that can enrich both personal and professional development.`,
    examinerNotes: 'Both advantages and disadvantages are developed with reasoning rather than just assertion. The reference to research on academic performance adds credibility to the advantages section. The conclusion avoids being vague by linking outcomes to the quality of planning.',
    wordCount: 270,
    difficulty: 'medium',
    tags: ['advantages-disadvantages', 'education', 'lifestyle'],
  },
  {
    id: 30,
    task: 2,
    type: 'problem-solution',
    title: 'Traffic congestion in cities',
    prompt: `Traffic congestion is a serious problem in many cities around the world.

What are the main causes of traffic congestion, and what measures could be taken to reduce it?`,
    keyPoints: [
      'Identify main causes of traffic congestion',
      'Suggest specific solutions',
      'Support points with explanation or examples',
    ],
    modelAnswer: `Traffic congestion costs urban economies billions each year in lost productivity, fuel waste, and increased pollution. It is a problem with identifiable causes and proven solutions, although addressing it requires political will as well as financial investment.

The root cause of urban congestion is the dominance of private car use as the primary mode of transport in most cities. This in turn reflects two underlying factors: the failure of many cities to develop high-quality public transport alternatives, and the way urban areas have been planned around car accessibility — spread out, with residential areas separated from employment and services in ways that make walking or cycling impractical. As a result, private car journeys are often the only viable option for most trips, particularly during peak hours.

Reducing congestion requires changes to both transport infrastructure and urban policy. Investing in rapid, reliable, and affordable public transport — metro systems, trams, and bus rapid transit — provides commuters with a genuine alternative to driving. Several cities, including Singapore and London, have demonstrated that congestion charging — levying a fee to enter the city centre by car — significantly reduces private vehicle use while generating revenue for public transport investment.

Urban planning policies that mix residential, commercial, and recreational uses within walkable neighbourhoods reduce the need for long journeys altogether. Incentivising cycling through safe infrastructure and improving conditions for pedestrians also shifts short journeys away from cars at relatively low cost.

No single intervention eliminates congestion, but a combination of investment, pricing, and planning reform can make a substantial difference within a decade.`,
    examinerNotes: 'Causes are explained at a structural level (urban planning, lack of alternatives) rather than simply blaming individual behaviour. Solutions are specific and evidenced (Singapore, London). The conclusion is measured and realistic. Academic register maintained throughout.',
    wordCount: 264,
    difficulty: 'hard',
    tags: ['problem-solution', 'society', 'environment'],
  },
]
