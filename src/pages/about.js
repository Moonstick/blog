import * as React from 'react'
import Layout from '../components/layout'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>Hi, my name is David O'Brien and I'm working as a software consultant which generally involves working teams of people to design and build systems. I'm currently working for <a href="http://www.codurance.com">Codurance</a> as one of their Principal Craftsment.</p>
      <p>As well as being interested in using software to solve problems, I'm also a bit of an amateur cook and some of that will probably be represented in the posts I make.</p>
      <p>I've been promising that I'll blog more regularly for quite a long time so this is my effort to do that, mostly as a way of documenting some of the things I learn, as well as a way to make me more intentional about starting (and finishing) at least some of the projects I've been ruminating about the last decade or two.</p>
    </Layout>
  )
}

export const Head = () => <title>About Me</title>

export default AboutPage