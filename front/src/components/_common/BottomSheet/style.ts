import styled from "@emotion/styled";

export const BottomSheet = styled.div`
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
  background: ${({ theme }) => theme.colors.white};
  padding: 23px 26px 33px 26px;
  border-radius: 30px 30px 0 0;
`;

export const BottomSheetTitle = styled.div`
  ${({ theme }) => theme.font.heading_2}
`;

export const BottomSheetButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 33px;
`;

export const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;

  background: rgba(59, 58, 58, 0.3);
`;

export const BottomSheetButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
