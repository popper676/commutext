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
  FeaturesDesigns,
  PricingDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'AI Polite Text Generation',
      description:
        'Create polite and contextually appropriate text with our AI technology. Perfect for enhancing communication in any scenario.',
      icon: 'mdiRobot',
    },
    {
      name: 'Multilingual Translation',
      description:
        'Seamlessly translate text between English, Chinese, and Tamil. Break language barriers and communicate effortlessly.',
      icon: 'mdiTranslate',
    },
    {
      name: 'User Customization',
      description:
        'Tailor the AI-generated text to match your personal communication style. Ensure your messages are always on point.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Text History Management',
      description:
        'Access and manage your past generated texts easily. Reuse or modify them for future communications.',
      icon: 'mdiHistory',
    },
    {
      name: 'Secure Data Handling',
      description:
        'Your data is safe with us. We prioritize security and privacy, ensuring your information is protected.',
      icon: 'mdiLock',
    },
    {
      name: 'Real-Time Feedback',
      description:
        'Provide feedback on AI-generated text to help us improve our services. Your input is valuable to us.',
      icon: 'mdiComment',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'AI Polite Text Generation',
        'Multilingual Translation',
        'User Customization',
      ],
      limited_features: ['Limited Text History Access', 'Basic Support'],
    },
    premium: {
      features: [
        'AI Polite Text Generation',
        'Multilingual Translation',
        'User Customization',
        'Text History Management',
      ],
      also_included: ['Priority Support', 'Advanced Security Features'],
    },
    business: {
      features: [
        'AI Polite Text Generation',
        'Multilingual Translation',
        'User Customization',
        'Text History Management',
        'Real-Time Feedback',
        'Dedicated Account Manager',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is ideal for individuals looking to enhance their personal communication with AI-generated polite text and basic multilingual support.',
    premium:
      'The Premium plan is perfect for small startups or agencies that require advanced features and priority support to improve team communication.',
    business:
      'The Business plan is designed for enterprises needing comprehensive communication solutions, including dedicated support and advanced management features.',
  };

  const testimonials = [
    {
      text: '${projectName} has revolutionized our communication process. The AI-generated text is always polite and accurate, making our interactions seamless.',
      company: 'Innovative Solutions Inc.',
      user_name: 'John Doe, CEO',
    },
    {
      text: 'The multilingual support offered by ${projectName} is a game-changer for our global team. We can now communicate effectively across languages.',
      company: 'Global Reach Enterprises',
      user_name: 'Jane Smith, Global Communications Manager',
    },
    {
      text: "I love how easy it is to customize the text to match our brand's voice. ${projectName} has made our customer service more efficient.",
      company: 'Customer First Corp.',
      user_name: 'Emily Johnson, Customer Service Lead',
    },
    {
      text: "The real-time feedback feature in ${projectName} helps us continuously improve our communication strategies. It's an invaluable tool for our team.",
      company: 'Feedback Innovations',
      user_name: 'Michael Brown, Product Manager',
    },
    {
      text: 'With ${projectName}, we have seen a significant improvement in our internal communication. The user-friendly interface makes it accessible to everyone.',
      company: 'Tech Savvy Solutions',
      user_name: 'Sarah Lee, IT Director',
    },
    {
      text: "The security features in ${projectName} give us peace of mind knowing our data is protected. It's a reliable solution for our business needs.",
      company: 'Secure Data Corp.',
      user_name: 'David Wilson, Security Analyst',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the range of services offered by ${projectName}, including AI-generated polite text, multilingual support, and more. Discover how we can enhance your communication.`}
        />
      </Head>
      <WebSiteHeader projectName={'commutext'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'commutext'}
          image={['AI enhancing communication services']}
          mainText={`Transform Your Communication with ${projectName}`}
          subTitle={`Discover the innovative services offered by ${projectName} to enhance your communication. From AI-generated polite text to multilingual support, we have the tools you need.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'commutext'}
          image={['AI-driven communication tools']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Unlock the full potential of your communication with ${projectName}'s advanced features designed to enhance clarity and effectiveness.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'commutext'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <TestimonialsSection
          projectName={'commutext'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied ${projectName} Users `}
        />

        <ContactFormSection
          projectName={'commutext'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person using a laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our team at ${projectName} will respond promptly to address your needs.`}
        />
      </main>
      <WebSiteFooter projectName={'commutext'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
