import React from 'react'
import { MdOutlineQuestionMark } from 'react-icons/md'

function NoAnswer() {
    return (
        <div className='flex justify-center align-center items-center h-full py-6'>

            <div className='text-center space-y-4'>
                <MdOutlineQuestionMark className='mx-auto' size={30}/>
                <div>
                <h1 className='text-xl font-bold'> No Question Selected</h1>
                <p>Please select a question to view the answer section</p>
                </div>
            </div>
        </div>
    )
}

export default NoAnswer