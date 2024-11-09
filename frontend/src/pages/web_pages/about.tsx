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
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
        'Generate polite and contextually appropriate text with our advanced AI algorithms. Enhance your communication in any situation with ease.',
      icon: 'mdiRobot',
    },
    {
      name: 'Multilingual Support',
      description:
        'Communicate across English, Chinese, and Tamil with seamless text generation and translation. Break language barriers effortlessly.',
      icon: 'mdiTranslate',
    },
    {
      name: 'User-Friendly Interface',
      description:
        'Enjoy a simple and intuitive interface that makes accessing and using our features straightforward and efficient.',
      icon: 'mdiAccountCircle',
    },
  ];

  const testimonials = [
    {
      text: 'Using ${projectName} has transformed the way we communicate with our international clients. The AI-generated text is always polite and accurate.',
      company: 'Global Connect Solutions',
      user_name: 'Alice Johnson, Communications Director',
    },
    {
      text: 'As someone who struggles with communication, ${projectName} has been a lifesaver. The multilingual support is fantastic!',
      company: 'Inclusive Tech Corp',
      user_name: 'Michael Lee, Product Manager',
    },
    {
      text: 'The user-friendly interface of ${projectName} makes it easy for our team to generate and translate text quickly. Highly recommend!',
      company: 'Efficient Enterprises',
      user_name: 'Sarah Kim, Operations Manager',
    },
    {
      text: 'Our customer service has improved significantly since we started using ${projectName}. The AI-generated text is always on point.',
      company: 'Service Excellence Ltd.',
      user_name: 'David Brown, Customer Support Lead',
    },
    {
      text: "I love how ${projectName} helps me communicate more effectively with my colleagues in different countries. It's a game-changer!",
      company: 'Tech Innovators Inc.',
      user_name: 'Emily Chen, Software Engineer',
    },
    {
      text: 'The translation feature in ${projectName} is incredibly accurate and fast. It has made our international projects much smoother.',
      company: 'Global Ventures Group',
      user_name: 'James Patel, Project Coordinator',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Discover ${projectName}`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission, values, and the innovative features we offer to enhance communication through AI-generated polite text.`}
        />
      </Head>
      <WebSiteHeader projectName={'commutext'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'commutext'}
          image={['Team discussing innovative ideas']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`Explore the mission and values that drive ${projectName} to enhance communication through AI-generated polite text. Join us in making communication accessible and effective for everyone.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Learn More`}
        />

        <AboutUsSection
          projectName={'commutext'}
          image={['Team working on AI project']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`At ${projectName}, we are committed to transforming communication through innovative AI solutions. Our mission is to empower individuals with tools that make interactions polite and effective across languages.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'commutext'}
          image={['AI-driven communication tools']}
          withBg={0}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Discover how ${projectName} enhances communication with cutting-edge AI features designed to make your interactions more effective and inclusive.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'commutext'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'commutext'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person writing an email']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'commutext'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
