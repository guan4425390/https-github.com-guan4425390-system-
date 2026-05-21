/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { useExamState } from './hooks/useExamState';
import { Layout } from './components/Layout';
import { WelcomePage } from './components/WelcomePage';
import { DrawPage } from './components/DrawPage';
import { ConfirmedPage } from './components/ConfirmedPage';
import { ExamPage } from './components/ExamPage';

export default function App() {
  const { state, updateState } = useExamState();

  const CurrentComponent = useMemo(() => {
    switch (state.currentPage) {
      case 'welcome': return WelcomePage;
      case 'draw': return DrawPage;
      case 'confirmed': return ConfirmedPage;
      case 'exam': return ExamPage;
      default: return WelcomePage;
    }
  }, [state.currentPage]);

  return (
    <Layout>
      <CurrentComponent state={state} updateState={updateState} />
    </Layout>
  );
}
