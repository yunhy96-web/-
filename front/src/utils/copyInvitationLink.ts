export const copyInvitationLink = (id: number) => {
  if (!id) return;
  const invitationLink = `https://d1zdvff23sqy4w.cloudfront.net/mySchedule/detail/${id}`;
  navigator.clipboard.writeText(invitationLink).then(() => {});
};
