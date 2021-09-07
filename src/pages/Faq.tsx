import React from 'react';
import { Questions } from '../components/Questions';
import { Tab, Tabs } from '../components/Tabs';
import { Question } from '../types';

const Faq: React.FC = () => {
  const questionsData1: Question[] = [
    {
      question: 'What moderation means?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence. If you don’t have a social profile, make sure that your.'
    },
    {
      question: 'Will receive offers from brands?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.If you don’t have a social profile, make sure that your.'
    },
    {
      question: 'How to register and start working with the app?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence. If you don’t have a social profile, make sure that your.'
    },
  ];

  const questionsData2: Question[] = [
    {
      question: 'What moderation means?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence. If you don’t have a social profile, make sure that your.'
    },
    {
      question: 'How to register and start working with the app?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence. If you don’t have a social profile, make sure that your.'
    },
  ];

  const questionsData3: Question[] = [
    {
      question: 'Will receive offers from brands?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.If you don’t have a social profile, make sure that your.'
    },
    {
      question: 'What moderation means?',
      answer: 'If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence. If you don’t have a social profile, make sure that your.'
    },

  ];

  return (
    <section className="Faq">
      <h1>FAQ</h1>

      <Tabs>
        <Tab title="Authorization Issues"><Questions data={questionsData1} /></Tab>
        <Tab title="The first steps"><Questions data={questionsData2} reverse={true} /></Tab>
        <Tab title="Payment"><Questions data={questionsData3} /></Tab>
      </Tabs>
    </section>
  );
};

export {
  Faq
};