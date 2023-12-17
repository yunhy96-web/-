export const copyInvitationLink = (id: number) => {
  if (!id) return;
  const invitationLink = `http://localhost:3000/mySchedule/detail/${id}`;
  navigator.clipboard.writeText(invitationLink).then(() => {});
};
