export const copyInvitationLink = (groupId: number) => {
  if (!groupId) return;
  const invitationLink = `${process.env.REACT_APP_SERVICE_URL}/invitation?groupId=${groupId}`;
  navigator.clipboard.writeText(invitationLink).then(() => {});
};
