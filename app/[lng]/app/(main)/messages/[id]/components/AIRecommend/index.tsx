import { useSuggestDate } from "@/service/schedule/hooks";
import { Place } from "@/types/map";
import { useEffect, useState } from "react";
import EnterAreaStep from "./EnterAreaStep";
import EnterDateTypeStep from "./EnterDateTypeStep";
import EnterPlaceTypeStep from "./EnterPlaceTypeStep";
import GetStartedStep from "./GetStartedStep";
import MachineMessage from "./MachineMessage";
import UserMessage from "./UserMessage";
import AIResponse from "./AIResponse";

enum QueryStep {
  Start = 0,
  EnterArea,
  EnterDateType,
  EnterPlaceType,
  Answer,
}

interface Query {
  area: string;
  dateType: string;
  placeType: string;
}

interface AIRecommendProps {
  onSelectedPlacesChange: (places: Place[]) => void;
  onOpenScheduleEditor: () => void;
}

const AIRecommend = ({
  onSelectedPlacesChange,
  onOpenScheduleEditor,
}: AIRecommendProps) => {
  const [currentStep, setCurrentStep] = useState<QueryStep>(QueryStep.Start);
  const [stepEditing, setStepEditing] = useState<QueryStep | null>(null);

  const [query, setQuery] = useState<Query>({
    area: "",
    dateType: "",
    placeType: "",
  });

  const [suggestPlaces, setSuggestPlaces] = useState<Place[]>([]);

  const suggestDate = useSuggestDate({
    onSuccess: (data) => {
      const result = data.filter(
        (place: any) => place && typeof place.isEmpty === "undefined",
      );
      setSuggestPlaces(result);
    },
  });

  useEffect(() => {
    if (currentStep !== QueryStep.Answer) return;

    const queryString = createQueryString(query);

    suggestDate.mutate({
      content: queryString,
      location: query.area,
    });
  }, [query, currentStep]);

  const onCancelEdit = () => setStepEditing(null);

  const onRegenerate = () => {
    const { area, dateType, placeType } = query;

    if (!area || !dateType || !placeType) return;

    const queryString = createQueryString(query);

    suggestDate.mutate({
      content: queryString,
      location: area,
    });
  };

  const handleOpenScheduleEditor = () => {
    onSelectedPlacesChange(suggestPlaces);
    onOpenScheduleEditor();
  };

  const onQueryChange = (key: string, value: string) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-full min-h-[50vh] w-full flex-col">
      <div className="flex-1 space-y-2">
        <MachineMessage
          isLoading={false}
          message="Tôi là Finder, một cộng sự giúp bạn có ý tưởng cho buổi hẹn của mình. Tôi
          có một số hạn chế và không phải lúc nào cũng đúng do vậy bạn chỉ nên tham khảo"
        />

        {currentStep > QueryStep.Start && (
          <UserMessage message="Giúp tôi tạo lịch hẹn" />
        )}

        {currentStep > QueryStep.Start && (
          <MachineMessage
            message="Chắc chắn rồi, hãy cho tôi biết khu vực bạn muốn hẹn hò cùng người
          ấy"
          />
        )}

        {config.map(
          ({ name, step, nextStep, StepComponent, machineMessage }) => {
            if (currentStep > step)
              return (
                <>
                  <UserMessage
                    message={query[name]}
                    isEditing={stepEditing === step}
                    disabled={suggestDate.isLoading}
                    onEdit={() => setStepEditing(step)}
                    onCancelEdit={onCancelEdit}
                    EditSection={
                      <StepComponent
                        isEditing
                        value={query[name]}
                        onChange={(value: string) => {
                          onQueryChange(name, value);
                          setStepEditing(null);

                          if (currentStep !== QueryStep.Answer)
                            setCurrentStep(nextStep);
                        }}
                        onCancel={onCancelEdit}
                      />
                    }
                  />
                  {machineMessage && (
                    <MachineMessage message={machineMessage} />
                  )}
                </>
              );
          },
        )}

        {currentStep > QueryStep.EnterPlaceType && (
          <MachineMessage isLoading={suggestDate.isLoading}>
            <AIResponse
              suggestPlaces={suggestPlaces}
              onRegenerate={onRegenerate}
              onOpenScheduleEditor={handleOpenScheduleEditor}
            />
          </MachineMessage>
        )}
      </div>

      {currentStep === QueryStep.Start && (
        <GetStartedStep
          onNextStep={() => setCurrentStep(1)}
          onOpenScheduleEditor={handleOpenScheduleEditor}
        />
      )}

      {config.map(({ name, step, nextStep, StepComponent }) => {
        if (currentStep === step)
          return (
            <StepComponent
              value={query[name]}
              onChange={(value: string) => {
                onQueryChange(name, value);
                setCurrentStep(nextStep);
              }}
            />
          );
      })}
    </div>
  );
};

export default AIRecommend;

const createQueryString = ({
  area,
  dateType,
  placeType,
}: {
  area: string;
  dateType: string;
  placeType: string;
}) => {
  let queryString = `Gợi ý cho tôi địa điểm `;

  if (placeType && placeType !== "Tôi chưa có ý tưởng")
    queryString = `Gợi ý cho tôi địa chỉ của những ${placeType} `;

  if (dateType && dateType !== "Sao cũng được")
    queryString += `có không gian ${dateType} `;

  if (area) queryString += `phù hợp cho hẹn hò ở ${area}`;

  return queryString;
};

const config: {
  name: keyof Query;
  step: QueryStep;
  nextStep: QueryStep;
  StepComponent: any;
  machineMessage?: string;
}[] = [
  {
    name: "area",
    step: QueryStep.EnterArea,
    nextStep: QueryStep.EnterDateType,
    StepComponent: EnterAreaStep,
    machineMessage: "Bạn muốn buổi hẹn của mình sẽ diễn ra thế nào",
  },
  {
    name: "dateType",
    step: QueryStep.EnterDateType,
    nextStep: QueryStep.EnterPlaceType,
    StepComponent: EnterDateTypeStep,
    machineMessage: "Cho tôi biết loại địa điểm bạn muốn đi cùng người ấy",
  },
  {
    name: "placeType",
    step: QueryStep.EnterPlaceType,
    nextStep: QueryStep.Answer,
    StepComponent: EnterPlaceTypeStep,
  },
];
