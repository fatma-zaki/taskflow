import { useState } from 'react';
import toast from 'react-hot-toast';
import { blobApiErrorMessage, exportsApi } from '@/services/api';
import { downloadBlob } from '@/shared/utils/file.js';
import { dayKey } from '@/shared/utils/date.js';

/**
 * Downloads the current task selection as CSV.
 *
 * @returns {{ exportCsv: (params?: Record<string, string>) => Promise<void>, isExporting: boolean }}
 */
export function useExportTasks() {
  const [isExporting, setExporting] = useState(false);

  /** @param {Record<string, string>} [params] */
  const exportCsv = async (params = {}) => {
    setExporting(true);
    try {
      const blob = await exportsApi.tasksCsv(params);
      downloadBlob(blob, `taskflow-tasks-${dayKey(new Date())}.csv`);
    } catch (error) {
      toast.error(await blobApiErrorMessage(error, 'Could not export the tasks'));
    } finally {
      setExporting(false);
    }
  };

  return { exportCsv, isExporting };
}

export default useExportTasks;
