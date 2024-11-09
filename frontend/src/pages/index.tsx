import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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

  const features_points = [
    {
      name: 'Multilingual Text Generation',
      description:
        'Generate polite text in English, Chinese, and Tamil. Tailor your communication to suit different languages and cultures with ease.',
      icon: 'mdiTranslate',
    },
    {
      name: 'Translation Services',
      description:
        'Translate text seamlessly between English, Chinese, and Tamil. Break language barriers and communicate effectively across different languages.',
      icon: 'mdiLanguage',
    },
    {
      name: 'Personalized Text Suggestions',
      description:
        'Receive AI-generated text suggestions that match your communication style. Ensure your messages are polite and appropriate for any context.',
      icon: 'mdiAccountCircle',
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
        <title>{`AI-Generated Polite Text for Effective Communication`}</title>
        <meta
          name='description'
          content={`Enhance your communication with AI-generated polite text in English, Chinese, and Tamil. Perfect for those who need assistance in crafting polite messages.`}
        />
      </Head>
      <WebSiteHeader projectName={'commutext'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'commutext'}
          image={['AI assisting communication']}
          mainText={`Empower Your Communication with AI`}
          subTitle={`Discover how ${projectName} can transform your communication with AI-generated polite text in English, Chinese, and Tamil. Perfect for enhancing clarity and politeness.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'commutext'}
          image={['AI-driven text generation']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Unlock the power of AI-generated polite text and multilingual translation with ${projectName}. Enhance your communication effortlessly.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'commutext'}
          image={['Team collaborating on AI solutions']}
          mainText={`Empowering Communication with ${projectName}`}
          subTitle={`${projectName} is dedicated to enhancing communication for everyone, especially those who need it most. Our AI-driven platform provides polite text generation and translation services to bridge language gaps and improve interactions.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <FaqSection
          projectName={'commutext'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'commutext'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Reach out to us anytime, and our team will respond promptly to help you with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'commutext'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
