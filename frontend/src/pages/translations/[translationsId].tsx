import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/translations/translationsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTranslations = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    original_text: '',

    translated_text: '',

    source_language: '',

    target_language: '',

    user: '',

    translated_on: new Date(),
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { translations } = useAppSelector((state) => state.translations);

  const { translationsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: translationsId }));
  }, [translationsId]);

  useEffect(() => {
    if (typeof translations === 'object') {
      setInitialValues(translations);
    }
  }, [translations]);

  useEffect(() => {
    if (typeof translations === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = translations[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [translations]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: translationsId, data }));
    await router.push('/translations/translations-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit translations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit translations'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
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
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='TranslatedOn'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.translated_on
                      ? new Date(
                          dayjs(initialValues.translated_on).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, translated_on: date })
                  }
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

EditTranslations.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TRANSLATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTranslations;
