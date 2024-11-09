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
      question: 'How does ${projectName} generate polite text?',
      answer:
        '${projectName} uses advanced AI algorithms to analyze context and generate text that is polite and suitable for various communication scenarios.',
    },
    {
      question: 'Can I use ${projectName} for multiple languages?',
      answer:
        'Yes, ${projectName} supports text generation and translation in English, Chinese, and Tamil, allowing you to communicate across these languages effortlessly.',
    },
    {
      question: 'Is my data secure with ${projectName}?',
      answer:
        'Absolutely. We prioritize user privacy and data security, ensuring that all your information is protected and used solely for improving your experience.',
    },
    {
      question: 'How can I access my past generated texts?',
      answer:
        'You can view and manage your past generated texts through the history feature, which allows you to reuse or modify them for future communications.',
    },
    {
      question: 'What if the AI-generated text is not appropriate?',
      answer:
        'Our admin team regularly reviews and moderates the AI-generated text to ensure quality and appropriateness. You can also provide feedback for improvements.',
    },
    {
      question: 'Is there a cost to use ${projectName}?',
      answer:
        'We offer various pricing plans to suit different needs. Please visit our pricing page for detailed information on the available options.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with the ${projectName} team for any inquiries or support. Find answers to common questions in our FAQ section.`}
        />
      </Head>
      <WebSiteHeader projectName={'commutext'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'commutext'}
          image={['Customer support representative']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help you with any questions or support you need. Reach out to the ${projectName} team and let us assist you.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'commutext'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'commutext'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on keyboard']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Feel free to reach out to us anytime. Our team at ${projectName} is ready to assist you with any inquiries or support you may need.`}
        />
      </main>
      <WebSiteFooter projectName={'commutext'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
