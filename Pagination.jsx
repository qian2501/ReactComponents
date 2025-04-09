import Button from '@/Components/Button';

export default function Pagination({ 
    className,
    buttonStyle,
    curPage,
    maxPage,
    handleClick
}) {
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
            onClick: () => handleClick(i + offset),
            content: i + offset + 1,
        };

        list.push(item);
    }

    return (
        <div className={"flex justify-center " + className}>
            <Button
                key="first"
                className={"m-1 " + buttonStyle}
                disabled={!curPage > 0}
                onClick={() => handleClick(0)}
            >
                |&lt;
            </Button>
  
            <Button
                key="prev"
                className={"m-1 " + buttonStyle}
                disabled={!curPage > 0}
                onClick={() => handleClick(curPage - 1)}
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
                className={"m-1 " + buttonStyle}
                disabled={!(curPage < maxPage - 1)}
                onClick={() => handleClick(curPage + 1)}
            >
                &gt;
            </Button>

            <Button
                key="last"
                className={"m-1 " + buttonStyle}
                disabled={!(curPage < maxPage - 1)}
                onClick={() => handleClick(maxPage - 1)}
            >
                &gt;|
            </Button>
        </div>
    );
}
