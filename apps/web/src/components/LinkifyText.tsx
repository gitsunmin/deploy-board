import React from "react";

type LinkifyTextProps = {
  text: string;
  className?: string;
};

export function LinkifyText({ text, className }: LinkifyTextProps) {
  // URL 정규식 패턴 (http://, https://, ftp:// 등으로 시작하는 링크)
  const urlPattern = /(https?:\/\/|ftp:\/\/)[^\s\n]+/g;

  // 텍스트를 줄바꿈으로 분리
  const lines = text.split("\n");

  // 각 줄을 처리
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => {
        const parts = [];
        let lastIndex = 0;
        let match;

        // 현재 줄에서 모든 URL 찾기
        while ((match = urlPattern.exec(line)) !== null) {
          // URL 앞의 텍스트 추가
          if (match.index > lastIndex) {
            parts.push(
              <span key={`text-${lastIndex}`}>
                {line.substring(lastIndex, match.index)}
              </span>
            );
          }

          // URL을 링크로 변환
          const url = match[0];
          parts.push(
            <a
              key={`link-${match.index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {url}
            </a>
          );

          lastIndex = match.index + url.length;
        }

        // 남은 텍스트 추가
        if (lastIndex < line.length) {
          parts.push(
            <span key={`text-end-${lastIndex}`}>
              {line.substring(lastIndex)}
            </span>
          );
        }

        return (
          <React.Fragment key={lineIndex}>
            {parts.length > 0 ? parts : line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
