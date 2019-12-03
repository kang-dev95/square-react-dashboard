import * as React from 'react'
import { AppState } from 'store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { IShowTypes } from 'store/show/types'
import { ITaskState } from 'store/tasks/types'
import { getShowState } from 'store/show/selectors'
import { filteredTasks } from 'store/tasks/selectors'
import TaskWrapper from 'components/Common/TaskWrapper'
import ContentTitle from 'components/Tasks/Content/ContentTitle'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }
`
const Tasks = styled.div`
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  //
  //grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`

interface IContentProps {
  backlog: ITaskState[]
  progress: ITaskState[]
  complete: ITaskState[]
  showAll: boolean
  showBacklog: boolean
  showState: IShowTypes
}

const types = {
  all: 'All tasks',
  backlog: 'Backlog',
  progress: 'In Progress',
  complete: 'Complete'
}

const Content: React.FC<IContentProps> = props => {
  return (
    <Wrapper>
      <ContentTitle />
      <Tasks>
        {props.showState.backlog ? (
          <TaskWrapper data={props.backlog} type='Backlog' />
        ) : null}
        {props.showState.progress ? (
          <TaskWrapper data={props.progress} type='In Progress' />
        ) : null}
        {props.showState.complete ? (
          <TaskWrapper data={props.complete} type='Complete' />
        ) : null}
      </Tasks>
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => ({
  showState: getShowState(state),
  backlog: filteredTasks(state, types.backlog),
  progress: filteredTasks(state, types.progress),
  complete: filteredTasks(state, types.complete)
})

export default connect(mapStateToProps)(Content)
