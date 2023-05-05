import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/utils/buttons';

export default function index({ icon, user, newProject, para }) {
  return (
    <>
      <div className="nav-project-flx">
        <h4 className="user-project-name">{user}</h4>
        <div className="community-project-flx">
          <div className="community-api-box">
            <Button
              bg="bg-white"
              border
              icon="/images/community.svg"
              text="Community projects"
            />
            <a target="_blank" href="https://dev-core.hemergy.com/docs/#/" >
            <Button
              bg="bg-white"
              border
              icon="/images/code.svg"
              text="Developer guide"
            />
            </a>
            <Button
              bg="bg-white"
              border
              icon="/images/cloud.svg"
              text="Use our API"
            />
            {icon && (
              <Button
                bg="bg-white"
                iconWidth={25}
                iconHeight={25}
                border
                icon="/images/emoji.svg"
              />
            )}
          </div>

          {newProject && (
            <Link href="./new-project" >
              <Button
                color
                bg="bg-btncolor"
                icon="/images/add.svg"
                text="New project"
                shadow
              />
            </Link>
          )}
        </div>
      </div>
      {para && (
        <p className="project-text">
          This is your projects dashboard. Once you have created projects you
          will see that information here
        </p>
      )}
    </>
  );
}
