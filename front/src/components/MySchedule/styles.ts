import styled from "@emotion/styled";

export const Content = styled.section`
  background: #f7f7f7;
  padding: 0 16px;
  padding-top: 80px;
  padding-bottom: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.h3`
  ${({ theme }) => theme.font.heading_1};
  text-align: left;
`;

export const CardTitle = styled.div`
  ${({ theme }) => theme.font.heading_2};
`;
export const DateTitle = styled.div`
  ${({ theme }) => theme.font.caption_2};
  color: #a7a7a7;
`;

export const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  padding: 22px 26px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
`;
export const Empty = styled.div`
  ${({ theme }) => theme.font.body_1};
  color: ${({ theme }) => theme.colors.gray_1};
  text-align: center;
  margin-top: 40px;
  white-space: pre-line;
  line-height: 30px; /* 187.5% */
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const CreateButton = styled.div`
  position: fixed;
  bottom: 30px;
  width: calc(100% - 36px);
  min-width: 324px;
  left: 18px;
  z-index: 20;

  @media (min-width: 761px) {
    width: calc(393px - 36px);
    left: calc((100% - (393px - 36px)) / 2);
    /* position: relative; */
  }
`;

export const CreateButton2 = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-width: 324px;
  /* left: 18px; */
  z-index: 20;
`;

export const Dropdown = styled.ul`
  position: absolute;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  padding: 6px 0px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  top: 26px;
`;

export const DropdownItem = styled.li`
  padding: 6px 13px;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.font.caption_2};
  white-space: nowrap;
`;

export const DropdownBox = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.sub};
`;

export const CircleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  height: 40px;
`;

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

  background: rgba(59, 58, 58, 0.3);
`;

export const BottomSheetButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
