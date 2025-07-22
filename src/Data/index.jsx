import { useGlobalContext } from '../utils/GlobalContext';

import arJsonData from './ar/AppContent.json';
import enJsonData from './en/AppContent.json';

import { AboutDataForCompany as arAboutDataForCompany, AboutDataForClient as arAboutDataForClient } from './ar/AboutData';
import { AboutDataForCompany as enAboutDataForCompany, AboutDataForClient as enAboutDataForClient } from './en/AboutData';

import { experiences as arExperinseData } from './ar/ProjectsData';
import { experiences as enExperinseData } from './en/ProjectsData';

//~ Helper to get language from context
  export function getContentByLang(lang) {
    return {
      content: lang === 'ar' ? arJsonData : enJsonData,
      AboutDataForCompany: lang === 'ar' ? arAboutDataForCompany : enAboutDataForCompany,
      AboutDataForClient: lang === 'ar' ? arAboutDataForClient : enAboutDataForClient,
      experiences: lang === 'ar' ? arExperinseData : enExperinseData
    };
  }

//~ Hook for React components
  export function useContent() {
    const { WhichLang } = useGlobalContext();
    return getContentByLang(WhichLang);
  }
