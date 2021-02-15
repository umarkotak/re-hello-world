import React from 'react'

/**
 *
 * @param {Boolean} props.show
 * @param {Function} props.onClick
 * @param {String} props.title
 * @param {String <any>} props.children
 */
export default function Modal({
  show,
  onClick,
  iconTitle,
  title,
  children,
  width,
}) {
  const props = {
    show: show,
    onClick: onClick,
    iconTitle: iconTitle,
    title: title,
    children: children,
    width: width || `494px`,
  }

  if (!props.show) {
    return null
  } else {
    return (
      <React.Fragment>
        <div className="bg-filter-modal" onClick={e => props.onClick(e)}></div>
        <div className="container-modal">
          <div className="modal-header-ui">
            <p className="title">{props.title}</p>
            <span onClick={e => props.onClick(e)}>&times;</span>
          </div>
          <div className="fdn-modal-content">{props.children}</div>
        </div>
        <style>
          {`
          .bg-filter-modal {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 999;
          }  
          .container-modal {
            position: fixed;
            z-index: 999;
            width: ${props.width};
            max-height: 520px;
            background: #fff;
            padding: 20px;
            margin: 10% auto;
            border-radius: 10px;
            border-top: 4px solid #007BFF;
            top: 0;
            left: 0;
            right: 0;
            -webkit-animation-name: animatezoom;
            -webkit-animation-duration: 0.4s;
            animation-name: animatezoom;
            animation-duration: 0.4s;
          }
          .modal-header-ui {
            position: relative;
            width: 100%;
            height: 40px;
          }
          .modal-header-ui .title {
            position: absolute;
            margin: 0;
            font-size: 20px;
            font-weight: bold;
          }
          .modal-header-ui span {
            position: absolute;
            color: #aaa;
            right: 0;
            top: -10px;
            margin-bottom: 50px;
            font-size: 28px;
            font-weight: bold;
          }
          .modal-header-ui span:hover, .modal-header-ui span:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
          }
          .fdn-modal-content {
            width: 100%;
            max-height: 490px;
            overflow-y: scroll;
            scroll-padding-right: 50px;
          }
          @keyframes animatezoom {
            from {
              transform: scale(0.1);
            }
            to {
              transform: scale(1);
            }
          }
        `}
        </style>
      </React.Fragment>
    )
  }
}
