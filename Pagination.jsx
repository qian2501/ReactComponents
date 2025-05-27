import { useState } from 'react';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';

export default function Pagination({ 
    className,
    buttonStyle,
    curPage,
    maxPage,
    onPageChange
}) {
    const [jumpPage, setJumpPage] = useState('');

    const handleJump = () => {
        const page = parseInt(jumpPage);
        if (!isNaN(page) && page >= 1 && page <= maxPage) {
            onPageChange(page - 1);
            setJumpPage('');
        } else {
            setJumpPage('');
        }
    };
    var list = [];
    var offset = 0;

    if (maxPage > 7) {
        if (curPage > 3 && curPage < maxPage - 3) {
            offset = curPage - 3;
        } else if (curPage >= maxPage - 3) {
            offset = maxPage - 7;
        }
    }

    for (let i = 0; i < 7 && i + offset < maxPage; i++) {
        let item = {
            page: i + offset,
            disabled: i + offset == curPage,
            onClick: () => onPageChange(i + offset),
            content: i + offset + 1,
        };

        list.push(item);
    }

    return (
        <div className={"flex justify-center " + className}>
            <Button
                key="prev"
                className={"m-1 w-4 " + buttonStyle}
                disabled={curPage <= 0}
                onClick={() => onPageChange(curPage - 1)}
            >
                &lt;
            </Button>

            {list.map(item => 
                <Button
                    key={item.page}
                    className={"m-1 " + buttonStyle}
                    disabled={item.disabled}
                    onClick={item.onClick}
                >
                    {item.page == curPage ? <b>{item.content}</b> : item.content}
                </Button>
            )}

            <Button
                key="next"
                className={"m-1 w-4 " + buttonStyle}
                disabled={curPage >= maxPage - 1}
                onClick={() => onPageChange(curPage + 1)}
            >
                &gt;
            </Button>

            <div className="flex items-center ml-4">
                <TextInput
                    type="text"
                    className="m-1 w-12 h-8 p-0 text-center text-black"
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    min="1"
                    max={maxPage}
                    placeholder={curPage + 1 + '/' + maxPage}
                />
 
                <Button
                    className={"m-1 " + buttonStyle}
                    onClick={handleJump}
                >
                    Go
                </Button>
            </div>
        </div>
    );
}
