import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'commutext';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is an AI-powered tool that generates polite text for communication. It analyzes the context you provide and creates suitable text for various scenarios.',
    },
    {
      question: 'Can ${projectName} translate text into multiple languages?',
      answer:
        'Yes, ${projectName} supports translation between English, Chinese, and Tamil, allowing you to communicate effectively across these languages.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize your privacy and data security. All information is securely stored and used only to enhance your experience with ${projectName}.',
    },
    {
      question: 'How do I access my previous text generations?',
      answer:
        'You can access your past generated texts through the history feature, which allows you to view, reuse, or modify them as needed.',
    },
    {
      question: 'What if I encounter issues with the AI-generated text?',
      answer:
        'Our admin team reviews and moderates the AI-generated text to ensure quality. You can also provide feedback to help us improve the service.',
    },
    {
      question: 'Are there different pricing plans available?',
      answer:
        'Yes, we offer various pricing plans to cater to different needs. Please visit our pricing page for more details on the available options.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}, including features, pricing, and more. Contact us for further assistance.`}
        />
      </Head>
      <WebSiteHeader projectName={'commutext'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'commutext'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered About ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, pricing, and support.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'commutext'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'commutext'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person sending an email']}
          mainText={`Need More Help? Contact ${projectName} `}
          subTitle={`If you have further questions or need assistance, feel free to reach out. Our team at ${projectName} is here to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'commutext'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
