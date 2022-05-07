import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { GithubContext } from "../context/context";
const Search = () => {
  const [user, setUser] = useState("");
  //get things from global context

  const { rate, error, SearchUserApi, isLoading } = useContext(GithubContext);
  //console.log(SearchUserApi());
  //console.log(isLoading);

  const submitHandler = function (e) {
    e.preventDefault();
    //console.log(e);
    console.log(user.split(" ").join(""));
    //setUser("");
    //more login coming up soon
    if (user) {
      SearchUserApi(user.split(" ").join(""));
    }
  };
  const changeHandler = function (event) {
    setUser(event.target.value);
  };
  const disableBtn = rate > 0 ? "" : "disabled";
  return (
    <section className="section">
      <Wrapper className="section-center">
        {error.show && (
          <ErrorWrapper>
            <p>{error.message}</p>
          </ErrorWrapper>
        )}
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <MdSearch></MdSearch>
            <input
              onChange={changeHandler}
              type="text"
              placeholder="Enter UserName"
              value={user}
            ></input>
            <button className={disableBtn}>Search</button>
          </div>
        </form>
        <h3>Requests:{rate}/60</h3>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    .no-click {
      pointer-events: none;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }

  .disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
