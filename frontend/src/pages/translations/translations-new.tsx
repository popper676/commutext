import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/translations/translationsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  original_text: '',

  translated_text: '',

  source_language: 'english',

  target_language: 'english',

  user: '',

  translated_on: '',
};

const TranslationsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/translations/translations-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='OriginalText' hasTextareaHeight>
                <Field
                  name='original_text'
                  as='textarea'
                  placeholder='OriginalText'
                />
              </FormField>

              <FormField label='TranslatedText' hasTextareaHeight>
                <Field
                  name='translated_text'
                  as='textarea'
                  placeholder='TranslatedText'
                />
              </FormField>

              <FormField label='SourceLanguage' labelFor='source_language'>
                <Field
                  name='source_language'
                  id='source_language'
                  component='select'
                >
                  <option value='english'>english</option>

                  <option value='chinese'>chinese</option>

                  <option value='tamil'>tamil</option>
                </Field>
              </FormField>

              <FormField label='TargetLanguage' labelFor='target_language'>
                <Field
                  name='target_language'
                  id='target_language'
                  component='select'
                >
                  <option value='english'>english</option>

                  <option value='chinese'>chinese</option>

                  <option value='tamil'>tamil</option>
                </Field>
              </FormField>

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='TranslatedOn'>
                <Field
                  type='datetime-local'
                  name='translated_on'
                  placeholder='TranslatedOn'
                />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/translations/translations-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

TranslationsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_TRANSLATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TranslationsNew;
