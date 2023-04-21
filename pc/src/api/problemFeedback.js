import request from '@/utils/request'
// /assistance/saveFeedbackProblem
export const saveFeedbackProblemApi = (data) =>
  request({
    method: 'POST',
    url: '/assistance/saveFeedbackProblem',
    data,
  })
