<script setup>
import EducationItem from '@/components/EducationItem.vue'
import ExperienceItem from '@/components/ExperienceItem.vue'
</script>

<template>
  <div id="root-container">
    <div id="container">
      <h1>Bagrat Aznauryan</h1>

      <main>
        <div id="left-column">

          <div id="info">
            <div>
              <font-awesome-icon icon="fa-solid fa-location-dot" />
              <span>
                <a href="https://goo.gl/maps/ux7VvLvrwnphZxX9A">Yerevan, Armenia</a>
              </span>
            </div>
            <div>
              <font-awesome-icon icon="fa-solid fa-clock" />
              <span>UTC+4</span>
            </div>
            <div>
              <font-awesome-icon icon="fa-solid fa-book" />
              <span>
                <a href="https://bagrat.io/story">Story</a>
              </span>
            </div>
            <div>
              <font-awesome-icon icon="fa-solid fa-envelope" />
              <span>
                <a href="mailto:contact@bagrat.io">contact@bagrat.io</a>
              </span>
            </div>
            <div>
              <font-awesome-icon icon="fa-solid fa-globe" />
              <span>
                <a href="https://bagrat.io">www.bagrat.io</a>
              </span>
            </div>
            <div>
              <font-awesome-icon icon="fa-brands fa-github" />
              <span>
                <a href="https://github.com/bagrat">Github</a>
              </span>
            </div>
            <div>
              <font-awesome-icon icon="fa-brands fa-stack-overflow" />
              <span>
                <a href="overflow.com/users/3264192/bagrat">Stack Overflow</a>
              </span>
            </div>
          </div>

          <div id="tech">
            <h2>Tech</h2>
            <ul>
              <li>elixir</li>
              <li>python</li>
              <li>golang</li>
              <li>postgresql</li>
              <li>mysql</li>
              <li>redis</li>
              <li>gh-actions</li>
              <li>gitlab-ci</li>
              <li>ansible</li>
              <li>kubernetes</li>
              <li>helm</li>
              <li>terraform</li>
            </ul>
          </div>

          <div id="academics">
            <h2>Education</h2>
            <div class="education-items">
              <EducationItem year="2014" degree="MSc in Computer Science" university="American University of Armenia"/>
              <EducationItem year="2012" degree="BSc in Physics" university="Yerevan State University"/>
            </div>
          </div>
        </div>

        <div id="experiences">
          <h2>Experience</h2>        
          <div class="items">

            <ExperienceItem company="Ntropy" range="Sep 2021 - Jul 2022" location="London, UK (worked remotely from Yerevan, Armenia)">
              Maintained and developed a financial transactions categorization API in Python along with its client library. Implemented properly ordered and fault-tolerant deployment of inter-dependant services onto Kubernetes using Helm and GitHub Actions. Implemented a distributed scraping solution for data gathering through carefully managed VPN IPs.
            </ExperienceItem>
            <ExperienceItem company="Smunch" range="Sep 2020 - Aug 2021" location="Berlin, Germany (worked remotely from Yerevan, Armenia)">
              Maintained legacy microservices in Node.js deployed on AWS Lambda via Serverless. Improved CI pipelines to increase confidence and stability of the maintenance and new adjustments. Gathered requirements and architected new software systems for internal operations management.
            </ExperienceItem>
            <ExperienceItem company="Sauce Labs" range="Oct 2015 - Sep 2020" location="San Francisco, USA (worked remotely from Yerevan, Armenia)">
              Developed and maintained the core services of Sauce Labs mainly using Go and asynchronous Python, deploying on Kubernetes. Participated in on-call rotation for production troubleshooting. Contributed to the CI/CD pipelines. Implemented caching and rate limiting for the API to unload the database. Set up monitoring of services for better insights into system state.
            </ExperienceItem>
            <ExperienceItem company="Aarki" range="Nov 2014 - Oct 2015" location="Yerevan, Armenia">
              Designed scalable web services for an advertising platform, set up the infrastructure, including CI and configuration management. Developed wrappers/decorators for Python to reduce repeating and routine implementation tasks, which increased development and debugging time by providing more intuitive and clean code.
            </ExperienceItem>
            <ExperienceItem company="IU Networks" range="Mar 2013 - Nov 2014" location="Yerevan, Armenia">
              Designed 3-tier architecture for an e-commerce web service using Java. Organized the CI pipeline, which increased software quality and release processes and decreased development time. Developed base classes for unit testing which eased test coding by initialising and providing all necessary resources. Implemented business logic split into service and data access layers.
            </ExperienceItem>
            <ExperienceItem company="be2" range="Jul 2012 - Mar 2013" location="Yerevan, Armenia">
              Maintained RESTful Web Services for a matchmaking web application. Improved software development processes by setting up the development environment and writing automation scripts, which increased development productivity. Increased code coverage with unit tests and documentation which improved code readability and decreased build fails.
            </ExperienceItem>
            <ExperienceItem company="Antel Design" range="Feb 2010 - Jul 2012" location="Yerevan, Armenia">
              Developed a command line interface via RS232 using C language on AVR32 architecture for a proprietary wireless transceiver. Additionally, integrated a third party Wi-Fi module on same platform to enable remote wireless configuration of the radio module. Wrote technical specifications and documentations for each piece of software.
            </ExperienceItem>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
#root-container {
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
}

#container {
  width: 70vh;
  height: 98vh;
  margin: auto;

  display: flex;
  flex-direction: column;

  /* DEBUG */
  /* border: solid 1px black; */
}

h1 {
  margin: 0 0 0 0;
  margin-bottom: 4%;
  margin-top: 2%;

  font-size: 1.7em;
}

main {
  display: flex;
  flex-direction: row;
}

main h2 {
  font-size: 1.2em;

  margin: 0 0 0 0;
  margin-bottom: 0.7em;

  padding: 0 0 0 0;

  border-bottom: solid 1px var(--color-base-2);
}

#info {
  display: flex;
  flex-direction: column;

  font-size: 0.7em;
  justify-content: space-around;

  border: solid 1px var(--color-base-2);
  border-radius: 2px;

  padding: 5% 0% 5% 7%;

  /* margin-top: 2.3em; */
  margin-bottom: 2rem;
}

#info a {
  text-decoration-color: var(--color-base-1);
}

#info > div > span {
  padding-left: 0.3em;
}

#tech {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */

  /* DEBUG */
  /* border: solid 1px black; */
}

#tech > ul {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */

  padding: 0 0 0 0;
  margin: 0 0 0 0;

  /* width: auto; */

  /* DEBUG */
  /* border: solid 1px black; */
}

#tech > ul > li {
  list-style: none;

  border: solid 1px var(--color-base-5);
  border-radius: 2px;

  padding-left: 0.4em;
  padding-right: 0.4em;
  padding-bottom: 0.1em;

  margin-right: 0.3em;
  margin-bottom: 0.3em;

  font-size: 0.7em;
}

#academics {
  margin-top: 2rem;
}

.education-items {
  display: flex;
  flex-direction: column;
}

#experiences {
  display: flex;
  flex-direction: column;
  margin-left: 4%;
}
</style>
