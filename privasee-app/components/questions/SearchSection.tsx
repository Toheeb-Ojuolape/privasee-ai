import React from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import AddQuestion from '../dialogs/AddQuestionModal'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

function SearchSection({ setSearch, refreshQuestions, addQuestion }) {

    const handleSearch = (searchValue) => {
        setSearch(searchValue)
        refreshQuestions(searchValue)
    }

    return (
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-grow">
                            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                <SearchIcon className="h-4 w-4" />
                            </div>
                            <Input
                                onChange={(e) => handleSearch(e.target.value)}
                                id="search"
                                type="search"
                                placeholder="Search a question..."
                                className="w-full rounded-lg bg-background pl-8"
                            />
                        </div>
                        <AddQuestion addQuestion={addQuestion}>
                            <Button className="my-2" variant={"secondary"}>
                                <PlusCircle size={20} />
                            </Button>
                        </AddQuestion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSection