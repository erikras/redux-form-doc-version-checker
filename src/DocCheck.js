import React from 'react'
import styled from 'styled-components'
import Icon from 'react-fontawesome'
import getLatestVersion from './getLatestVersion'
import extract from './extract'
import { isMuted, mute } from './mute'

const dropPatch = version => {
  const [major,minor] = version.split('.')
  return `${major}.${minor}`
}

export default class DocCheck extends React.Component {
  state = {}

  componentDidMount() {
    const version = extract.url(document.location.href)
    this.setState({
      muted: isMuted(),
      version
    })
    getLatestVersion(version).then(latest => {
      this.setState({ latest })
    })
  }

  mute = event => {
    event.preventDefault()
    this.setState({ muted: true })
    mute()
  }

  render() {
    const { latest, muted, version } = this.state
    return latest && dropPatch(latest) !== dropPatch(version) && !muted ? (
      <Fixed>
        <Container>
          <Close href="#close" onClick={this.mute}>
            <Icon name="times" />
          </Close>
          <Message>
            You are looking at the documentation for version{' '}
            <Version>v{version}</Version>.
          </Message>
          <Message>
            The latest is <Version>v{latest}</Version>.
          </Message>
          <GoToRow>
            <GoTo href={document.location.href.replace(version, latest)}>
              <Icon name="calendar-check-o" /> Go To Latest
            </GoTo>
          </GoToRow>
          <Mute href="#mute" onClick={this.mute}>
            <Icon name="clock-o" /> I know. Don't remind me for 7 days.
          </Mute>
        </Container>
      </Fixed>
    ) : null
  }
}

const Fixed = styled.div`
  position: fixed;
  top: 4px;
  left: 0;
  right: 0;
`

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  text-align: center;
  width: 440px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  padding-top: 5px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
`

const Message = styled.div`margin: 4px;`

const Version = styled.span`
  font-family: Menlo, Consolas, 'Courier New', monospace;
`

const GoToRow = styled.div`margin: 15px 0;`

const GoTo = styled.a`
  text-decoration: none;
  padding: 10px 20px;
  background-image: linear-gradient(#76b4e6, #4a79c3);
  color: white;
  border-radius: 3px;
`

const Mute = styled.a`
  display: block;
  margin: 10px 0 5px 0;
  text-align: center;
  text-decoration: none;
  color: #666;
  font-size: 0.9em;
  border-top: 1px dashed #ccc;
  padding: 5px;
`

const Close = styled.a`
  position: absolute;
  top: 4px;
  right: 4px;
  color: #666;
  font-size: 1.5em;
`
