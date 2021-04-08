FROM curlimages/curl AS flow

ENV FLOW_CLI_VERSION=0.16.0
RUN sh -ci "$(curl -fsSL https://storage.googleapis.com/flow-cli/install.sh $FLOW_CLI_VERSION)"
RUN /home/curl_user/.local/bin/flow version

FROM alpine

COPY --from=flow /home/curl_user/.local/bin/flow /bin/flow

WORKDIR /app
ADD . .

# Expose GRPC and HTTP ports
EXPOSE 8080
EXPOSE 3569

ENTRYPOINT [ "/bin/flow" ]
CMD ["project", "start-emulator"]
