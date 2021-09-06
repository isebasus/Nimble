import React from 'react';

const projectContainer = ({projectId, name, method, xRotate, yRotate, path, imagePath, coverId, project}) =>  {

    return(
        <div style={{color: '-webkit-link', cursor: 'pointer'}} onClick={path}>
            <div className="parent" id={projectId}>
                <div className="project">
                    <div className="cover" id={coverId}></div>
                </div>
            </div>
            <div className="projectName">
                <h1 className="name">{name}</h1>
            </div>
        </div>
    
    )
};

const Project = projectContainer;

export default Project;