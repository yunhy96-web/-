import styled from "@emotion/styled";

export const Card = styled.li<{ isOpen: boolean }>`
  padding: 17px 24px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  transition: all 0.1s ease-in-out;
  height: ${({ isOpen }) => (isOpen ? "187px" : "72px")};

  /* min-width: 360px; */
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
`;

export const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TitleInput = styled.input`
  margin: 0 6px 0 9px;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.sub2};
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  width: 100%;
  height: 37px;
  padding-left: 8px;
`;

export const TitleText = styled.div`
  margin: 0 6px 0 9px;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.sub2};
`;

export const Arrow = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;

export const Detail = styled.textarea<{ isOpen: boolean }>`
  transition: all 0.1s ease-in-out;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 12px 18px;
  width: 100%;
  margin-top: 21px;
  color: ${({ theme }) => theme.colors.sub};
  height: 95px;
  background: #f7f7f7;
  border: none;
  border-radius: 8px;
  resize: none;
  :focus {
    outline: none;
  }
`;

export const DragButton = styled.div<{ isGrab: boolean }>`
  cursor: ${({ isGrab }) => (isGrab ? "grabbing" : "grab")};
  height: 24px;
`;

export const TitleRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
