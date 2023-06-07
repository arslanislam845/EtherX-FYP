
import React from 'react'
// const faqs = [
//     {
//       id: 1,
//       question: "What's the best thing about Switzerland?",
//       answer:
//         "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
//     },
//     // More questions...
//   ]

  const faqs = [
    {
        id: 1,
        question: 'How do I know the tips are good?',
        answer:
          'Our whole business depends on our tips being good, so it’s in our best interest that they are. The results of our customers speak for themselves, just trust us.',
      },
      {
        id: 2,
        question: 'Isn’t this insider trading?',
        answer:
          'Yes exactly. But at scale! Historically you could only make insider trades with knowledge from your direct network. Pocket brings you insider trading tips from people you don’t even know.',
      },
      {
            id: 4,
            question: 'Do the people giving you tips realize what they are doing?',
            answer:
              'Again I would argue this isn’t really our responsibility. People make their own choices. If they don’t research the consequences that’s on them, not on us.',
          },
          {
            id: 5,
            question: 'Where is Pocket based?',
            answer:
              'Let’s just say it’s not somewhere where the SEC is going to find us.',
          },
          {
            id: 6,
            question: 'Is there any age limit to trading on Pocket?',
            answer:
              'For our free plan, the age limit is based on the minimum age to trade in your country of residence. Our VIP plan uses advanced transaction anonymization though, so you can use that plan even if you’re 9 years old. Or a dog.',
          },
    
  ]

  export default function Example() {
    return (
      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                sending us an email
              </a>{' '}
              and we’ll get back to you as soon as we can.
            </p>
          </div>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  