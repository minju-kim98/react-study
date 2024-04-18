import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import Alert from '@shared/Alert'

import { useAlertContext } from '@contexts/AlertContext'

function App() {
  const { open } = useAlertContext()

  return (
    <>
      <div>
        <Text typography="t1" display="block" color="red">
          t1
        </Text>
        <Text typography="t2" color="blue">
          t2
        </Text>
        <Text typography="t3">t3</Text>
        <Text typography="t4">t4</Text>
        <Text>t5</Text>
      </div>
      <div>
        <Button>클릭해주세요</Button>
        <Button color="success">클릭해주세요</Button>
        <Button color="error">클릭해주세요</Button>
        <Button color="success" weak={true}>
          클릭해주세요
        </Button>
        <Button color="success" weak={false}>
          클릭해주세요
        </Button>
        <Button full={true}>클릭해주세요</Button>
        <Button full={true} disabled={true}>
          클릭해주세요
        </Button>
      </div>
      <div style={{ height: 10, width: '100%' }}></div>

      <Input placeholder="로그인" aria-invalid={false} />
      <Input aria-invalid={true} />

      <TextField label="아이디" />
      <TextField label="패스워드" hasError={true} />

      {/* <Alert
        open={true}
        title="Alert이 떴습니다."
        onButtonClick={() => {}}
        description="안녕하세요"
      /> */}

      <Button
        onClick={() => {
          open({
            title: '카드 신청 완료',
            description: '내역페이지에서 확인해주세요',
            onButtonClick: () => {
              console.log('Alert 버튼 클릭했습니다.')
            },
          })
        }}
      >
        Alert 오픈
      </Button>
    </>
  )
}

export default App
