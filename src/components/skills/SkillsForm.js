import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import StyledInput from '../common/StyledInput';
import StyledSelect from '../common/StyledSelect';

/**
 *
 */
const SkillsFormBlock = styled.div`
  padding-top: 2rem;

  form {
    display: flex;
    justify-content: center;

    > div {
      margin-left: 1rem;
    }
  }
`;

function SkillsForm({ onSubmit, error }) {
  useEffect(() => {
    if (error) {
      alert('그런 캐릭터 없다');
    }
  }, [error]);

  const [nickname, setNickname] = useState('');
  const [server, setServer] = useState({
    code: '',
    value: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(server.code, nickname);
  };

  const onNicknameChange = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  const onServerChange = useCallback(server => {
    setServer(server);
  }, []);

  const datas = [
    { code: 'GARDEN', value: '정원' },
    { code: 'NUI', value: '누이' },
    { code: 'DAMIAN', value: '다미안' },
    { code: 'HAJE', value: '하제' },
    { code: 'ORCHIDNA', value: '오키드나' },
    { code: 'EANNA', value: '에안나' },
  ];

  return (
    <SkillsFormBlock>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledSelect
            placeholder="서버명"
            value={server.value}
            onChange={onServerChange}
            datas={datas}
            width="120px"
          />
        </div>
        <div>
          <StyledInput
            placeholder="캐릭터명"
            value={nickname}
            onChange={onNicknameChange}
          />
        </div>
        <div>
          <Button type="submit" blue>
            숙련도 조회
          </Button>
        </div>
      </form>
    </SkillsFormBlock>
  );
}

export default React.memo(SkillsForm);
