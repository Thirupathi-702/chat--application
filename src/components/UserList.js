import React from 'react';

const UserList = ({ users, loggedInUser, handleLogout }) => {
    return (
        <div className="user-list">
            <h3>Active Users</h3>
            <ul>
                {users.map((user, index) => (
                    <li
                        key={index}
                        className={user === loggedInUser ? 'highlighted' : ''}
                    >
                        {user}
                        {user === loggedInUser && (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;


