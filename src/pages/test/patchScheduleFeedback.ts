
export const patchScheduleFeedback = async (
  api, // createApiWithToken으로 만든 axios 인스턴스
  scheduleId: string,
  feedback: string
) => {
  const url = `/schedules/${scheduleId}/feedback`;

  const res = await api.patch(url, { feedback }, {
    requiresAuth: true, // accessToken 자동 포함
    headers: {
      "Content-Type": "application/json",
    },
  } );

  return res.data; // 수정된 schedule 전체 정보
};
