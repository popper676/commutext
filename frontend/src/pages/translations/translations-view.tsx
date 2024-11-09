import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/translations/translationsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const TranslationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { translations } = useAppSelector((state) => state.translations);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View translations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View translations')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={translations?.original_text}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={translations?.translated_text}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>SourceLanguage</p>
            <p>{translations?.source_language ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TargetLanguage</p>
            <p>{translations?.target_language ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{translations?.user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='TranslatedOn'>
            {translations.translated_on ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  translations.translated_on
                    ? new Date(
                        dayjs(translations.translated_on).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No TranslatedOn</p>
            )}
          </FormField>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/translations/translations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TranslationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TRANSLATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TranslationsView;
